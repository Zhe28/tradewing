import type { MockMethod } from 'vite-plugin-mock'
import { faker } from '@faker-js/faker'

function customer(dateListNum = 100) {
  const dateList: dataList[] = []
  for (let i = 0; i < dateListNum; i++) {
    dateList.push({
      county: faker.location.country(),
      name: faker.person.fullName(),
      product: faker.commerce.productName(),
      'contact-time': faker.date.recent(),
      source: faker.helpers.arrayElement([
        '谷歌开发',
        '全球搜',
        'RFQ',
        '阿里营销',
        '阿里询盘',
        '超迹AI',
        '',
      ]),
      'contact-type': faker.helpers.arrayElement(['whatsApp', '邮箱', '阿里']),
      email: faker.internet.email(),
      'whatsup/wechat': faker.helpers.arrayElement(['whatsup', 'wechat']),
      phone: faker.phone.number(),
      'customer-type': faker.helpers.arrayElement(['加工户', '', '经销商', '中间商']),
      company: faker.company.name(),
      website: faker.internet.url(),
      remark: faker.lorem.sentences(),
      status: faker.helpers.arrayElement(['已成交', '已做行票', '询价', '潜力客户']),
    })
  }

  return dateList
}

export default [
  {
    url: '/api/avaliable-customer/get',
    method: 'get',
    response: ({ query }) => {
      // console.log('query', query.num)
      return customer(query.num)
    },
  },
] as MockMethod[]
