<template>
  <a-card title="热门产品" class="product-card">
    <a-list item-layout="horizontal" :data-source="hotProducts">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta :title="item.name">
            <template #avatar>
              <a-avatar :src="item.image" />
            </template>
            <template #description>
              <div class="product-meta">
                <span>¥{{ item.price }}</span>
                <span>销量: {{ item.salesCount }}</span>
              </div>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </a-card>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 热门产品数据
const hotProducts = ref([
  {
    id: 1,
    name: "高档陶瓷茶具套装",
    image: "https://avatars.githubusercontent.com/u/32154293?v=4",
    price: 299,
    salesCount: 1258,
  },
  {
    id: 2,
    name: "智能家居控制器",
    image: "https://avatars.githubusercontent.com/u/32154293?v=4",
    price: 599,
    salesCount: 892,
  },
  {
    id: 3,
    name: "便携式太阳能充电宝",
    image: "https://avatars.githubusercontent.com/u/32154293?v=4",
    price: 189,
    salesCount: 765,
  },
  {
    id: 4,
    name: "防水蓝牙音箱",
    image: "https://avatars.githubusercontent.com/u/32154293?v=4",
    price: 129,
    salesCount: 712,
  },
  {
    id: 5,
    name: "竹制厨房用品套装",
    image: "https://avatars.githubusercontent.com/u/32154293?v=4",
    price: 219,
    salesCount: 683,
  },
]);
</script>

<style scoped>
.product-meta {
  display: flex;
  justify-content: space-between;
  color: #666;
}
</style>
