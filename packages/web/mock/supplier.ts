import type { MockMethod } from 'vite-plugin-mock'
import { faker } from '@faker-js/faker/locale/zh_CN'
import { supplier } from '../env'

function supplier(dateListNum = 50) {
  const suppliers: supplier[] = []

  for (let i = 0; i < dateListNum; i++) {
    suppliers.push({
      name: faker.person.fullName(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      remark: faker.lorem.sentences(),
      address: faker.location.streetAddress(),
      product: [
        {
          product: faker.commerce.productName(),
          buyer: faker.person.fullName(),
          type: 'purchase',
          time: faker.date.recent(),
          remark: faker.lorem.sentences(),
          color: faker.color.rgb(),
          transfer: faker.datatype.boolean(),
        },
        {
          product: faker.commerce.productName(),
          buyer: faker.person.fullName(),
          type: 'purchase',
          time: faker.date.recent(),
          remark: faker.lorem.sentences(),
          color: faker.color.rgb(),
          transfer: faker.datatype.boolean(),
        },
      ],
    })
  }

  return suppliers
}

export default [
  {
    url: '/api/supplier/get',
    method: 'get',
    response: ({ query }) => {
      // console.log('query', query.num)
      return supplier(query.num)
    },
  },
] as MockMethod[]
