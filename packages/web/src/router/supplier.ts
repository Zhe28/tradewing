import type { RouteRecordRaw } from 'vue-router'

export const supplierRoute: RouteRecordRaw[] = [
  {
    path: '/supplier',
    name: 'supplier',
    component: () => import('@/views/Supplier.vue'),
  },
]
