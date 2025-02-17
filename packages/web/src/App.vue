<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <a-menu
        @select="handleSelect"
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="inline"
        :items="menus"
      >
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" />
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { MailOutlined, PhoneOutlined, AreaChartOutlined } from '@ant-design/icons-vue'
import { ref, h, watch } from 'vue'
import type { ItemType } from 'ant-design-vue'
import { useRoute, useRouter } from 'vue-router'

// 菜单列表数据
const menus = ref<ItemType[]>([
  {
    key: '/',
    icon: h(AreaChartOutlined),
    label: 'Dashboard',
  },
  {
    key: '/available-customer',
    icon: h(PhoneOutlined),
    label: '可谈客户',
  },
  {
    key: '/supplier',
    icon: h(MailOutlined),
    label: '供应商',
  },
])
// 侧边栏折叠状态
const collapsed = ref<boolean>(false)
const selectedKeys = ref<string[]>(['/available-customer'])

// 菜单选中事件处理
function handleSelect({ item, key, selectedKeys }) {
  console.log(`menu switch ->`, item, key, selectedKeys)
  router.push(key)
}

const router = useRouter()
const route = useRoute()
const currentPath = ref<string>(route.path)

watch(
  () => route.path,
  async () => {
    selectedKeys.value[0] = route.path
  },
  {
    immediate: true,
  },
)
</script>
<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>
