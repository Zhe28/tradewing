<script lang="ts" setup>
import { ShopOutlined, GlobalOutlined, DollarOutlined, FundOutlined } from '@ant-design/icons-vue'

import RecentOrdersComponent from '@/views/DashBoard/Components/RecentOrdersComponent.vue'
import SalesTrendCard from '@/views/DashBoard/Components/SalesTrendCard.vue'
import HotProductsCard from '@/views/DashBoard/Components/HotProductsCard.vue'
import ToDoList from '@/views/DashBoard/Components/ToDoList/Index.vue'
import { h, ref } from 'vue'

const infoPreview = ref([
  {
    icon: h(GlobalOutlined),
    title: '国外客户数量',
    value: '243',
  },
  {
    icon: h(DollarOutlined),
    title: '本月销售额度',
    value: '$278,530',
  },
  {
    icon: h(FundOutlined),
    title: '毛利率',
    value: '32.5%',
  },
])
</script>

<template>
  <div class="page-index-container">
    <a-row :gutter="[16, 16]">
      <!--   数据展示详情   -->
      <a-col v-for="item in infoPreview" :key="item.title" :md="8" :sm="24" :xs="24">
        <a-card class="stat-card">
          <template #title>
            <div class="card-title">
              <component :is="item.icon" />
              <span>{{ item.title }}</span>
            </div>
          </template>
          <div class="stat-value">{{ item.value }}</div>
        </a-card>
      </a-col>

      <!--待办事项-->
      <a-col :span="24">
        <to-do-list />
      </a-col>
      <!-- 销售趋势图抽离为组件 -->
      <a-col :lg="16" :span="24">
        <sales-trend-card />
      </a-col>

      <!-- 右侧热门产品保持不变 -->
      <a-col :lg="8" :span="24">
        <hot-products-card />
      </a-col>

      <!-- 待处理订单保持不变 -->
      <a-col :span="24">
        <recent-orders-component />
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
.card-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
}
</style>
