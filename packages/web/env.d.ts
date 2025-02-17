/// <reference types="vite/client" />

declare type dataList = {
  county: string
  name: string
  product: string
  'contact-time': string & Date
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

declare type record = { text: string; value: string }
