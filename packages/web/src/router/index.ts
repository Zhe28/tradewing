import { createRouter, createWebHistory } from 'vue-router'
import { prototypeRoute } from '@/router/prototype.ts'
import { homeRoute } from '@/router/home.ts'
import { supplierRoute } from '@/router/supplier.ts'
import { customerRoute } from '@/router/customer.ts'
import { invoiceRoute } from '@/router/invoice.ts'

// 所有路由所在处
const routes = homeRoute.concat(prototypeRoute).concat(supplierRoute).concat(customerRoute).concat(invoiceRoute)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
