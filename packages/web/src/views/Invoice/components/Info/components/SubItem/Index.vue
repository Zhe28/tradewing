<script lang="ts" setup>
import type { IProduct } from '@/types/invoice';
import { ref } from 'vue';

const { products } = defineProps<{ products: IProduct[] }>()

const activeKey = ref([])
//
</script>


<template>
  <a-list item-layout="vertical" :data-source="products">
    <template #renderItem="{ item: product }">
      <a-list-item :key="product.id">
        <a-list-item-meta>
          <!-- 前方图像图标 -->
          <template #avatar>
            <a-avatar size="large" shape="square" :style="{ backgroundColor: 'orange' }">
              <!-- 截取第四位之前的字符 -->
              {{ product.name.slice(0, 4) }}
            </a-avatar>
          </template>
          <!-- 商品名称 -->
          <template #title>
            <el-text>{{ product.name }}</el-text>
          </template>
        </a-list-item-meta>

        <!-- 商品尺寸信息 -->
        <div class="mt-[10px] grid grid-cols-1">
          <a-list :bordered="false" v-model:activeKey="activeKey" v-for="(size) in product.size" :key="size.id">
            <a-list-item :key="size.id">
              <template #title>
                <div>{{ size.name }}</div>
              </template>
              <a-space class="flex justify-between">
                <div>名称: {{ size.name }}</div>
                <div>数量: {{ size.quantity }}</div>
                <div>价格: {{ size.price }}</div>
              </a-space>
            </a-list-item>
          </a-list>
        </div>
      </a-list-item>
    </template>
  </a-list>
</template>
