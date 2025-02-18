import type { supplier } from '../../../env'
import { http } from './http'

export const getSupplier = async () => {
  return (await http.get('/api/supplier/get?num=100')).data as supplier[]
}
