<template>
  <div>
    <a-table :columns="supplierColumns" :data-source="suppliers" :scroll="{ x: 1500, y: 1000 }">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'name'">
          <el-text truncated>{{ record.name }}</el-text>
        </template>

        <template v-if="column.dataIndex === 'phone'">
          <el-text truncated>{{ record.phone }}</el-text>
        </template>

        <template v-if="column.dataIndex === 'email'">
          <el-text truncated>{{ record.email }}</el-text>
        </template>

        <template v-if="column.dataIndex === 'address'">
          <el-text truncated>{{ record.address }}</el-text>
        </template>

        <template v-if="column.dataIndex === 'remark'">
          <el-text truncated line-clamp="2">{{ record.remark }}</el-text>
        </template>

        <template v-if="column.dataIndex === 'product'">
          <a-tag v-for="product in record.product" :key="product" :color="product.color">
            {{ product.product }}
          </a-tag>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { useSupplierStore } from "@/stores/SupplierStore"
import { storeToRefs } from "pinia";

const supplierStore = useSupplierStore();
const { suppliers, supplierColumns } = storeToRefs(supplierStore)

// 开始更新数据
supplierStore.updateSuppliers()
</script>
