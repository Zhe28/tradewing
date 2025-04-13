<script setup lang="ts">
import { useInvoiceStore } from '@/stores/useInvoiceStore';
import { storeToRefs } from 'pinia';
import SubItem from '@/views/Invoice/components/Info/components/SubItem/Index.vue'

const { selectedInvoice } = storeToRefs(useInvoiceStore())
</script>

<template>
  <a-descriptions title="发票详情信息" bordered :column="2">
    <!-- 第一行 -->
    <a-descriptions-item label="购买人">{{ selectedInvoice?.buyer }}</a-descriptions-item>
    <a-descriptions-item label="供应商">{{ selectedInvoice?.supplier }}</a-descriptions-item>

    <!-- 第二行 -->
    <a-descriptions-item label="创建时间">{{ selectedInvoice?.createTime }}</a-descriptions-item>
    <a-descriptions-item label="发票编号">{{ selectedInvoice?.invoiceNumber }}</a-descriptions-item>

    <!-- 垂直布局的商品列表 -->
    <a-descriptions-item label="商品" span="2" class="vertical-item">
      <sub-item :products="selectedInvoice?.products ?? []" />
    </a-descriptions-item>
  </a-descriptions>
</template>