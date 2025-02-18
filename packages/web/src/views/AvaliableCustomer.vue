<template>
  <a-space>
    <a-button type="primary">新增</a-button>
    <a-button type="primary">删除</a-button>
  </a-space>
  <a-table :columns="columns" :data-source="data" :scroll="{ x: 2100, y: 700 }">
    <template #bodyCell="{ column, record }">
      <div v-if="column.key === 'county'" size="large">
        <el-text truncated>
          {{ record.county }}
        </el-text>
      </div>
      <div v-if="column.key === 'name'" size="large">
        <el-text size="large" truncated>
          {{ record.name }}
        </el-text>
      </div>
      <div v-if="column.key === 'product'" size="large">
        <el-text size="large" truncated>
          {{ record.product }}
        </el-text>
      </div>
      <div v-if="column.key === 'contact-time'" size="large">
        <el-text size="large" truncated>
          {{ record['contact-time'] }}
        </el-text>
      </div>
      <div v-if="column.key === 'source'" size="large">
        <el-text size="large" truncated>
          {{ record.source }}
        </el-text>
      </div>
      <div v-if="column.key === 'contact-type'" size="large">
        <el-text size="large" truncated>
          {{ record['contact-type'] }}
        </el-text>
      </div>
      <div v-if="column.key === 'email'" size="large">
        <el-text size="large" truncated>
          {{ record.email }}
        </el-text>
      </div>
      <div v-if="column.key === 'whatsup/wechat'" size="large">
        <el-text size="large" truncated>
          {{ record['whatsup/wechat'] }}
        </el-text>
      </div>
      <div v-if="column.key === 'phone'" size="large">
        <el-text size="large" truncated>
          {{ record.phone }}
        </el-text>
      </div>
      <div v-if="column.key === 'customer-type'" size="large">
        <el-text size="large" truncated>
          {{ record['customer-type'] }}
        </el-text>
      </div>
      <div v-if="column.key === 'company'" size="large">
        <el-text size="large" truncated>
          {{ record.company }}
        </el-text>
      </div>
      <div v-if="column.key === 'website'" size="large">
        <el-text size="large" truncated>
          {{ record.website }}
        </el-text>
      </div>
      <div v-if="column.key === 'remark'" size="large">
        <el-text size="large" truncated>
          {{ record.remark }}
        </el-text>
      </div>
    </template>
    <!-- 搜索栏 icon -->
    <!-- <template #customFilterIcon="{ filtered }" v-if="false">
      <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
    </template> -->
  </a-table>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useAvaliableCustomerStore } from '@/stores/AvaliableCustomerStore'
import { watch } from 'vue';

const avaliableCustomer = useAvaliableCustomerStore();
const { data, columns } = storeToRefs(avaliableCustomer)

// 监听数据更新， 如果data 更新， 对应的 filters 也更新
watch(data, async () => {
  const dataindexFilter = ['county', 'status', 'name'] as (keyof dataList)[]
  for (const key of dataindexFilter) {
    avaliableCustomer.updateFilters(key)
  }
})
// 获取 http 请求的数据
avaliableCustomer.updateData();


// 重置filter 内容
</script>
