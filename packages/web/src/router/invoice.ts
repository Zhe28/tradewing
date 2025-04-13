export const invoiceRoute = [
  {
    path: '/invoice',
    name: 'Invoice',
    component: () => import('@/views/Invoice/Index.vue'),
    meta: {
      title: '发票',
    },
  },
]