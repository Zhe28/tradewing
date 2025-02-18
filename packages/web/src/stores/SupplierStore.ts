import { getSupplier } from '@/utils/http/supplierApi'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { supplier } from '../../env'

export const useSupplierStore = defineStore('Supplier', () => {
  const suppliers = ref<supplier[]>([])
  const supplierColumns = ref([
    { title: '供应商名称', dataIndex: 'name', key: 'name', fixed: 'left',width: 104 },
    { title: '电话', dataIndex: 'phone', key: 'phone' },
    { title: '邮箱', dataIndex: 'email', key: 'email' },
    { title: '地址', dataIndex: 'address', key: 'address' },
    { title: '备注', dataIndex: 'remark', key: 'remark' },
    { title: '产品', dataIndex: 'product', key: 'product' },
  ])
  
  function updateSuppliers() {
    getSupplier().then((res) => {
      suppliers.value = res
    })
  }

  return {
    suppliers,
    supplierColumns,
    updateSuppliers,
  }
})

function generateColumnsProps(width=100){

}