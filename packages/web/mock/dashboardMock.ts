import { MockMethod } from 'vite-plugin-mock'
import { faker } from '@faker-js/faker/locale/zh_CN'

// 根据日期范围生成不同的统计数据
const generateStatisticsByRange = (range: string) => {
  const multiplier = range === '今日' ? 1 : range === '本周' ? 7 : range === '本月' ? 30 : 365

  return [
    {
      title: '总销售额',
      value: `¥${faker.number.int({ min: 10000 * multiplier, max: 50000 * multiplier }).toLocaleString()}`,
      change: faker.number.float({ min: -15, max: 20, precision: 0.1 }),
      bgColor: '#1890ff',
      icon: 'ShoppingBag'
    },
    {
      title: '访问人数',
      value: faker.number.int({ min: 1000 * multiplier, max: 5000 * multiplier }).toLocaleString(),
      change: faker.number.float({ min: -10, max: 30, precision: 0.1 }),
      bgColor: '#52c41a',
      icon: 'User'
    },
    {
      title: '订单数量',
      value: faker.number.int({ min: 500 * multiplier, max: 3000 * multiplier }).toLocaleString(),
      change: faker.number.float({ min: -5, max: 25, precision: 0.1 }),
      bgColor: '#fa8c16',
      icon: 'Document'
    },
    {
      title: '转化率',
      value: `${faker.number.float({ min: 10, max: 40, precision: 0.1 })}%`,
      change: faker.number.float({ min: -8, max: 15, precision: 0.1 }),
      bgColor: '#722ed1',
      icon: 'DataLine'
    }
  ]
}

// 生成业务趋势数据
const generateTrendData = (type: string, range: string) => {
  const days = range === '今日' ? 24 : range === '本周' ? 7 : range === '本月' ? 30 : 12
  const labels = range === '今日'
    ? Array.from({ length: days }, (_, i) => `${i}时`)
    : range === '全年'
      ? ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
      : Array.from({ length: days }, (_, i) => `${i + 1}${range === '本周' ? '日' : '号'}`)

  const maxValue = type === 'sales' ? 50000 : 5000
  const minValue = type === 'sales' ? 10000 : 1000

  return {
    xAxis: labels,
    series: Array.from({ length: days }, () => faker.number.int({ min: minValue, max: maxValue }))
  }
}

// 生成用户来源数据
const generateUserSourceData = () => {
  return [
    { value: faker.number.int({ min: 20, max: 40 }), name: '直接访问' },
    { value: faker.number.int({ min: 10, max: 30 }), name: '搜索引擎' },
    { value: faker.number.int({ min: 15, max: 25 }), name: '社交媒体' },
    { value: faker.number.int({ min: 5, max: 15 }), name: '外部链接' },
    { value: faker.number.int({ min: 1, max: 10 }), name: '其他' }
  ]
}

// 生成销售分类数据
const generateSalesCategoryData = () => {
  const categories = ['服装', '电子产品', '家居', '食品', '化妆品', '运动']

  return {
    indicators: categories.map(category => ({ name: category, max: 100 })),
    values: categories.map(() => faker.number.int({ min: 20, max: 90 }))
  }
}

// 生成活动列表数据
const generateActivitiesData = () => {
  const types = ['订单', '用户', '商品', '系统']
  const statuses = ['成功', '处理中', '失败']

  return Array.from({ length: 10 }, (_, index) => {
    const type = types[faker.number.int({ min: 0, max: types.length - 1 })]
    let title = ''

    switch (type) {
      case '订单':
        title = `客户${faker.person.lastName()}${faker.person.firstName()}完成订单`
        break
      case '用户':
        title = `新用户${faker.person.lastName()}${faker.person.firstName()}注册`
        break
      case '商品':
        title = `添加新商品"${faker.commerce.productName()}"`
        break
      case '系统':
        title = `系统${faker.system.commonFileName()}`
        break
    }

    return {
      id: 100000 + index,
      title,
      type,
      time: faker.date.recent({ days: 7 }).toLocaleString('zh-CN'),
      status: statuses[faker.number.int({ min: 0, max: statuses.length - 1 })]
    }
  })
}

export default [
  {
    url: '/api/dashboard/statistics',
    method: 'get',
    response: (req) => {
      const range = req.query.range || '本月'
      return generateStatisticsByRange(range as string)
    }
  },
  {
    url: '/api/dashboard/trend',
    method: 'get',
    response: (req) => {
      const type = req.query.type || 'sales'
      const range = req.query.range || '本月'
      return generateTrendData(type as string, range as string)
    }
  },
  {
    url: '/api/dashboard/user-source',
    method: 'get',
    response: () => {
      return generateUserSourceData()
    }
  },
  {
    url: '/api/dashboard/sales-category',
    method: 'get',
    response: () => {
      return generateSalesCategoryData()
    }
  },
  {
    url: '/api/dashboard/activities',
    method: 'get',
    response: () => {
      return generateActivitiesData()
    }
  }
] as MockMethod[]
