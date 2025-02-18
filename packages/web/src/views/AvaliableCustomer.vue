<template>
  <a-space>
    <a-button type="primary">新增</a-button>
    <a-button type="primary">删除</a-button>
  </a-space>
  <a-table :columns="columns" :data-source="data" :scroll="{ x: 2100, y: 700 }">

    <!-- filter dropdown -->
    <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
      <div v-if="column.key === 'contact-time'">
        <a-range-picker v-model:value="selectedKeys[0]" @change="() => setSelectedKeys()" />
        <a-input ref="searchInput" :placeholder="`Search ${column.dataIndex}`" :value="selectedKeys[0]"
          @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
          @pressEnter="handleEnterdown(selectedKeys, confirm, column.dataIndex)" />
      </div>
    </template>
    <!-- headercell -->
    <!-- <template #headerCell="{ column }">
      <div v-if="column.key === 'contact-time'">
        <div @click="contactTime.show = !contactTime.show">{{ column.title }}</div>

        <a-range-picker v-model:value="contactTime.data" v-if="contactTime.show" />
      </div>
    </template> -->

    <!-- bodycell -->
    <template #bodyCell="{ column, record, text }">
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
      <span v-if="state.searchText && state.searchedColumn === column.dataIndex">
        <template v-for="(fragment, i) in text
          .toString()
          .split(new RegExp(`(?<=${state.searchText})|(?=${state.searchText})`, 'i'))">
          {{ fragment }}
        </template>
      </span>
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
import { ref, watch } from 'vue';
import type { dataList } from '../../env';

const avaliableCustomer = useAvaliableCustomerStore();
const { data, columns } = storeToRefs(avaliableCustomer)
const state = ref({ searchText: '', searchedColumn: '' })
// 监听数据更新， 如果data 更新， 对应的 filters 也更新
watch(data, async () => {
  const dataindexFilter = ['county', 'status', 'name'] as (keyof dataList)[]
  for (const key of dataindexFilter) {
    avaliableCustomer.updateFilters(key)
  }
})
// 获取 http 请求的数据
avaliableCustomer.updateData();

function handleChange(e, setSetlectKeys) {
  console.log(e, setSetlectKeys);

}
function handleEnterdown(selectedKeys, confirm, dataIndex) {
  confirm()
  state.value.searchText = selectedKeys[0]
  state.value.searchedColumn = dataIndex
}
// 重置filter 内容
</script>

<!-- interface FilterDropdownProps {
  prefixCls: string;
  setSelectedKeys: (selectedKeys: Key[]) => void;
  selectedKeys: Key[];
  confirm: (param?: FilterConfirmProps) => void;
  clearFilters?: (param?: FilterResetProps) => void;
  filters?: ColumnFilterItem[];
  visible: boolean;
  column: ColumnType;
}

interface FilterConfirmProps {
  closeDropdown: boolean;
}

interface FilterResetProps {
  confirm?: boolean;
  closeDropdown?: boolean;
} -->
