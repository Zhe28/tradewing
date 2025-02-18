import type { dataList } from '../../../env'
import { http } from './http'

export const getAvaliableCustomer = async () => {
  return (await http.get('/api/avaliable-customer/get')).data as dataList[]
}
