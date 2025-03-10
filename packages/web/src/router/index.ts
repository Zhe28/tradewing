import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Dashboard/Index.vue'),
    },
    {
      path: '/available-customer',
      name: 'available-customer',
      component: ()=>import('@/views/AvaliableCustomer/Index.vue'),
    },
    {
      path: '/supplier',
      name: 'supplier',
      component: () => import('@/views/Supplier.vue'),
    },
    {
      path: '/prototype',
      name: 'prototype',
      redirect: '/prototype/dashboard',
      children: [
        {
          path: 'dashboard',
          component: () => import('@/views/prototype/Dashboard.vue'),
        },
        {
          //   增加 supplier 原型
          path: 'supplier',
          component: () => import('@/views/prototype/Supplier.vue'),
        },
      ],
    },
  ],
})

export default router
