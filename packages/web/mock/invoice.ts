import type { IProduct, IInvoice } from "../src/types/invoice"
import type { MockMethod } from "vite-plugin-mock"
import { faker } from "@faker-js/faker/locale/zh_CN";

const invoices = [] as IInvoice[]

/**
 * 生成商品详情
 * @returns 商品详情
 */
function generateProductDetail(): IProduct {
  const hasMainPicture = faker.datatype.boolean()
  const productID = faker.string.uuid()
  const image = hasMainPicture ? faker.image.url({ width: 500, height: 500 }) : ""
  // 随机生成若干个尺寸
  const sizes = [] as IProduct['size']


  for (let index = 0; index < faker.number.int({ min: 1, max: 10 }); index++) {
    sizes.push({
      id: `${productID}-${index}`,
      name: faker.book.title(),
      image: faker.image.url({ width: 500, height: 500 }),
      quantity: faker.number.int({ min: 1, max: 10 }),
      price: faker.number.int({ min: 100, max: 1000 })
    })
  }

  // 如果没有主要的封面图片， 那么肯定每个size都有自己的图片
  // 反之，如果有主要的封面图片，那么每个size共享一个封面图片
  if (hasMainPicture) {
    return {
      id: productID,
      name: faker.book.title(),
      image,
      size: sizes
    }
  } else return {
    id: productID,
    name: faker.book.title(),
    size: sizes
  }
}

/**
 * 生成发票列表
 * @param len 发票数量
 * @returns 发票列表
 */
function mockInvoices(len: number) {
  let time: number = 0;
  if (invoices.length > 0) return invoices

  // 生成len个发票
  while (len > time) {
    invoices.push(generateInvoiceDetail())
    time++
  }
  return invoices
}

/**
 * 生成发票详情
 * @returns 发票详情
 */
function generateInvoiceDetail(): IInvoice {
  // 随机生成若干个商品
  const products = [] as IProduct[]

  const invoiceID = faker.string.uuid()

  // 生成若干个商品
  for (let i = 0; i < faker.number.int({ min: 1, max: 5 }); i++) {
    products.push(generateProductDetail())
  }

  console.log(`生成${products.length}个商品`);

  return {
    id: invoiceID,
    buyer: faker.person.fullName(),
    supplier: faker.person.fullName(),
    invoiceNumber: faker.string.uuid(),
    products: products,
    createTime: faker.date.past().toISOString(),
    updateTime: faker.date.past().toISOString()
  }
}

export default [
  {
    url: '/api/invoice',
    method: 'get',
    response: ({ query = { num: 20 } }) => {
      console.log(query)
      return mockInvoices(query.num)
    },
  },
] as MockMethod[]
