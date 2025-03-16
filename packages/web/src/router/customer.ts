import type {  RouteRecordRaw } from 'vue-router'

export const customerRoute: RouteRecordRaw[] = [    {
  path: '/available-customer',
  name: 'available-customer',
  component: ()=>import('@/views/AvaliableCustomer/Index.vue'),
}]
