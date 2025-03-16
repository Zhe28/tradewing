import type { RouteRecordRaw } from 'vue-router'

export const prototypeRoute :RouteRecordRaw[]= [    {
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
},]
