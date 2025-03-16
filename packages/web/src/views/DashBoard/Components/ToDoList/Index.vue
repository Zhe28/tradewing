<script lang="ts" setup>
import {
  activeTab,
  title,
  tabList,
  filterList,
} from '@/views/DashBoard/Components/ToDoList/hooks/useToDoListHooks.ts'
</script>

<template>
  <a-card
    :active-tab-key="activeTab"
    :tab-list="tabList"
    :title="title"
    @tab-change="(tab: statusType) => (activeTab = tab)"
  >
    <template v-for="todo in filterList" :key="todo.id">
      {{ todo }}
    </template>
  </a-card>
</template>

<style scoped></style>
