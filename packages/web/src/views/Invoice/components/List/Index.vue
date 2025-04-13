<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useInvoiceStore } from '@/stores/useInvoiceStore';
import type { IInvoice } from '@/types/invoice';

const { invoices, drawerOpen } = storeToRefs(useInvoiceStore())

/**
 * 查看发票具体详细信息
 * @param id 发票id
 */
const handleView = (invoice: IInvoice) => {
  // 选中发票
  useInvoiceStore().selectedInvoice = invoice
  // 打开抽屉
  drawerOpen.value = true
}
</script>

<template>
  <a-list :data-source="invoices" item-layout="horizontal" :split="true">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta :title="`${item.buyer} - ${item.createTime}`" :description="item.invoiceNumber">
          <template #avatar>
            <a-avatar>{{ item.buyer[0] }}</a-avatar>
          </template>
        </a-list-item-meta>
        <template #actions>
          <a-button type="link" @click="handleView(item)">查看</a-button>
        </template>
      </a-list-item>
    </template>
  </a-list>
</template>

<style lang="scss" scoped></style>
