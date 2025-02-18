/// <reference types="vite/client" />

declare export type dataList = {
  county: string
  name: string
  product: string
  'contact-time': string | Date
  source: string
  'contact-type': string
  email: string
  'whatsup/wechat': string
  phone: string
  'customer-type': string
  company: string
  website: string
  remark: string
  status: string
}

declare export type record = { text: string; value: string }

declare export type supplier = {
  name: string
  phone: string
  email: string
  remark: string
  address: string
  product: supplierProductInfo[]
}

declare export type supplierProductInfo={
  color: string // 颜色
  product: string// 产品名称
  buyer: string // 采购方
  type: 'purchase' | 'sale' // 采购类型
  time: string | Date // 采购时间
  remark?: string // 备注
  transfer?: boolean // 是否运输
  transferTime?: string & Date // 运输时间
  // status?: 'processing' | 'finished' // 状态
}