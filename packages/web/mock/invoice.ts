import type { IProduct } from "../src/types/invoice"
import type { MockMethod } from "vite-plugin-mock"
import { faker } from "@faker-js/faker/locale/zh_CN";

const products = [] as IProduct[]

function mockProducts(len: number) {
  let time: number = 0;
  if (products.length > 0) return products

  // 生成len个商品
  while (len > time) {
    products.push(generateProductDetail())
    time++
  }
  return products
}

function generateProductDetail(): IProduct {
  const hasMainPicture = faker.datatype.boolean()

  const image = hasMainPicture ? faker.image.url({ width: 500, height: 500 }) : ""
  // 如果没有主要的封面图片， 那么肯定每个size都有自己的图片
  // 反之，如果有主要的封面图片，那么每个size共享一个封面图片
  if (hasMainPicture) {
    return {
      name: faker.book.title(),
      image,
      size: new Array(faker.number.int({ min: 1, max: 10 })).fill({
        quantity: faker.number.int({ min: 1, max: 10 }),
        price: faker.number.int({ min: 100, max: 1000 })
      })
    }
  } else return {
    name: faker.book.title(),
    size: new Array(faker.number.int({ min: 1, max: 10 })).fill({
      image: faker.image.url({ width: 500, height: 500 }),
      quantity: faker.number.int({ min: 1, max: 10 }),
      price: faker.number.int({ min: 100, max: 1000 })
    })
  }
}

export default [
  {
    url: '/api/invoice',
    method: 'get',
    response: ({ query = { num: 20 } }) => {
      return mockProducts(query.num)
    },
  },
] as MockMethod[]
