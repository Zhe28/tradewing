import { defineStore } from "pinia";
import { ref } from "vue";
import type { IInvoice } from "../types/invoice";
import { getInvoices } from "../utils/http/invoice";

export const useInvoiceStore = defineStore('invoice', () => {
  const invoices = ref<IInvoice[]>([])
  // 获取发票列表
  getInvoices(20).then(res => {
    invoices.value = res.data
  })

  // 显示抽屉详情
  const drawerOpen = ref(false)

  // 选中的发票
  const selectedInvoice = ref<IInvoice | null>(null)

  return { invoices, drawerOpen, selectedInvoice }
})