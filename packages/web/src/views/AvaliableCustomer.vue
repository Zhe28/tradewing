<template>
  <a-space>
    <a-button type="primary">新增</a-button>
    <a-button type="primary">删除</a-button>
  </a-space>
  <a-table :columns="columns" :data-source="data" :scroll="{ x: 1300, y: 700 }">
    <template #bodyCell="{ text }">
      <div class="max-h-[100px] overflow-y-hidden">{{ text }}</div>
    </template>
    <!-- 搜索栏 icon -->
    <template #customFilterIcon="{ filtered }" v-if="false">
      <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import { SearchOutlined } from '@ant-design/icons-vue'
import { storeToRefs } from 'pinia'
import { useAvaliableCustomerStore } from '@/stores/AvaliableCustomerStore'
import { watch } from 'vue';

const avaliableCustomer = useAvaliableCustomerStore();
const { data, columns } = storeToRefs(avaliableCustomer)

// 监听数据更新， 如果data 更新， 对应的 filters 也更新
watch(data, async () => {
  avaliableCustomer.updateFilters('county')
  avaliableCustomer.updateFilters("status")
})
// 获取 http 请求的数据
avaliableCustomer.updateData();


// 重置filter 内容
</script>
