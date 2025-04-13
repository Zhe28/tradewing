import { http } from "../http"

// 获取所有的发票
export const getInvoices = (num:number) => {
  return http.get('/api/invoice', {
    params: {
      num
    }
  })
}

export const getInvoiceById = (id: string) => {
  return http.get(`/api/invoice/${id}`)
}
