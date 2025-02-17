import AvaliableCustomer from '@/views/AvaliableCustomer.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Dashboard.vue'),
    },
    {
      path: '/available-customer',
      name: 'available-customer',
      component: AvaliableCustomer,
    },
    {
      path: '/supplier',
      name: 'supplier',
      component: () => import('../views/Supplier.vue'),
    },
  ],
})

export default router
