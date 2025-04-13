<script setup lang="ts">
import InvoiceList from "@/views/Invoice/components/List/Index.vue"
import { storeToRefs } from "pinia";
import { useInvoiceStore } from "@/stores/useInvoiceStore";
import InvoiceInfo from "@/views/Invoice/components/Info/Index.vue"

const { drawerOpen } = storeToRefs(useInvoiceStore())

</script>

<template>
  <div>
    <!-- 发票列表显示 -->
    <invoice-list />

    <!-- 发票详情显示 -->
    <a-drawer v-model:open="drawerOpen" :width="800" :footer="null">
      <invoice-info />
    </a-drawer>
  </div>
</template>

<style lang="scss" scoped></style>
