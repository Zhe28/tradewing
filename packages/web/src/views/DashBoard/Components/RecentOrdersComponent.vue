<script setup lang="ts">
import { ref, computed } from 'vue'
import { EditOutlined, EyeOutlined } from '@ant-design/icons-vue'

// 订单标签页
const activeOrderTab = ref('all')
const orderTabs = [
  { key: 'all', tab: '全部' },
  { key: 'waitingPay', tab: '待付款' },
  { key: 'waitingShip', tab: '待发货' },
  { key: 'shipping', tab: '发货中' },
  { key: 'completed', tab: '已完成' },
]

// 订单列表
const orderColumns = [
  { title: '订单号', dataIndex: 'orderNo', key: 'orderNo' },
  { title: '客户', dataIndex: 'customer', key: 'customer' },
  { title: '国家', dataIndex: 'country', key: 'country' },
  { title: '金额', dataIndex: 'amount', key: 'amount' },
  { title: '订单日期', dataIndex: 'date', key: 'date' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '操作', key: 'action' },
]

// 最近的订单
const recentOrders = ref<IOrderInfo[]>([
  {
    key: '1',
    orderNo: 'ORD-2023-5782',
    customer: 'ABC Trading Co.',
    country: '美国',
    amount: '$8,520',
    date: '2023-10-15',
    status: '待付款',
  },
  {
    key: '2',
    orderNo: 'ORD-2023-5781',
    customer: 'Euro Retail GmbH',
    country: '德国',
    amount: '$12,350',
    date: '2023-10-14',
    status: '待发货',
  },
  {
    key: '3',
    orderNo: 'ORD-2023-5780',
    customer: 'Japan Home Ltd.',
    country: '日本',
    amount: '$5,780',
    date: '2023-10-13',
    status: '发货中',
  },
  {
    key: '4',
    orderNo: 'ORD-2023-5779',
    customer: 'UK Supplies Inc.',
    country: '英国',
    amount: '$9,650',
    date: '2023-10-12',
    status: '已完成',
  },
  {
    key: '5',
    orderNo: 'ORD-2023-5778',
    customer: 'Aussie Markets',
    country: '澳大利亚',
    amount: '$4,320',
    date: '2023-10-11',
    status: '已完成',
  },
  {
    key: '6',
    orderNo: 'ORD-2023-5777',
    customer: 'Canadian Retail Group',
    country: '加拿大',
    amount: '$7,890',
    date: '2023-10-10',
    status: '已完成',
  },
])

// 通过监听 activeOrderTab 的数值，动态变化数值
const recentOrdersWithFilter = computed(() => {
  if (activeOrderTab.value === 'all') return recentOrders.value
  else return recentOrders.value.filter((order) => {
      // 获取订单标签页相对应的文本
      const tab = orderTabs.find((tab) => tab.key === activeOrderTab.value)?.tab
      return order.status === tab
    })
})

// 订单标签切换处理
const handleOrderTabChange = (key: string) => {
  activeOrderTab.value = key
}

// 获取订单状态颜色
const getStatusColor = (status: string) => {
  switch (status) {
    case '待付款':
      return 'orange'
    case '待发货':
      return 'blue'
    case '已发货':
      return 'purple'
    case '已完成':
      return 'green'
    default:
      return 'default'
  }
}
</script>

<template>
  <a-card
    title="最近订单"
    class="order-card"
    :tab-list="orderTabs"
    :active-tab-key="activeOrderTab"
    @tabChange="handleOrderTabChange"
  >
    <a-table
      :columns="orderColumns"
      :data-source="recentOrdersWithFilter"
      :pagination="{ pageSize: 10 }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'status'">
          <a-tag :color="getStatusColor(record.status)">{{ record.status }}</a-tag>
        </template>
        <template v-if="column.key === 'action'">
          <a-space>
            <a-button type="link" size="small">
              <eye-outlined />
              查看
            </a-button>
            <a-button type="link" size="small">
              <edit-outlined />
              编辑
            </a-button>
          </a-space>
        </template>
      </template>
    </a-table>
  </a-card>
</template>
