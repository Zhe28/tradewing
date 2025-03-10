<template>
  <div class="page-index-container">
    <a-row :gutter="[16, 16]">
      <!-- 顶部统计卡片保持不变 -->
      <a-col :xs="24" :sm="12" :md="6">
        <a-card class="stat-card">
          <template #title>
            <div class="card-title">
              <shop-outlined />
              <span>总供应商数</span>
            </div>
          </template>
          <div class="stat-value">168</div>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="12" :md="6">
        <a-card class="stat-card">
          <template #title>
            <div class="card-title">
              <global-outlined />
              <span>国外客户数</span>
            </div>
          </template>
          <div class="stat-value">243</div>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="12" :md="6">
        <a-card class="stat-card">
          <template #title>
            <div class="card-title">
              <dollar-outlined />
              <span>本月销售额</span>
            </div>
          </template>
          <div class="stat-value">$278,530</div>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="12" :md="6">
        <a-card class="stat-card">
          <template #title>
            <div class="card-title">
              <fund-outlined />
              <span>毛利率</span>
            </div>
          </template>
          <div class="stat-value">32.5%</div>
        </a-card>
      </a-col>

      <!-- 销售趋势图抽离为组件 -->
      <a-col :span="24" :lg="16">
        <sales-trend-card />
      </a-col>

      <!-- 右侧热门产品保持不变 -->
      <a-col :span="24" :lg="8">
        <hot-products-card />
      </a-col>

      <!-- 待处理订单保持不变 -->
      <a-col :span="24">
        <recent-orders-component />
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import {
  ShopOutlined,
  GlobalOutlined,
  DollarOutlined,
  FundOutlined,
} from "@ant-design/icons-vue";

import RecentOrdersComponent from "@/views/DashBoard/Components/RecentOrdersComponent.vue";
import SalesTrendCard from "@/views/DashBoard/Components/SalesTrendCard.vue";
import HotProductsCard from "@/views/DashBoard/Components/HotProductsCard.vue";
</script>

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
