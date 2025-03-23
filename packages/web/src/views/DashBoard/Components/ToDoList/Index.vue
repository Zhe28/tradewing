<script lang="ts" setup>
import {
  activeTab,
  title,
  tabList,
  filterList,
  handleDeleteToDo,
} from '@/views/DashBoard/Components/ToDoList/hooks/useToDoListHooks.ts'
import { ref } from 'vue';

const activeTodo = ref<activeTodoType>({ visible: false })
/**
 * 编辑选项
 * @param todo {activeTodoType}
 */
function handleEditTodo(item: activeTodoType) {
  // 把当前激活的 todo 复制给 activeTodo, 便于展示页面
  activeTodo.value = item
  activeTodo.value.visible = true;
}
function handleConfirmEdit() {

  activeTodo.value.visible = false
}
</script>

<template>

  <a-card :active-tab-key="activeTab" :tab-list="tabList" :title="title"
    @tab-change="(tab: statusType) => (activeTab = tab)">
    <el-scrollbar height="350">

      <a-list :data-source="filterList">
        <template #renderItem="{ item }">
          <a-list-item>
            <template #actions>
              <a key="list-loadmore-edit" @click="handleEditTodo(item)">edit</a>
              <a key="list-loadmore-more" @click="handleDeleteToDo(item)">delete</a>
            </template>
            <a-list-item-meta :title="item.title" :description="item.description" />
          </a-list-item>
        </template>
      </a-list>
      <!-- 修改todo对话框 -->
      <a-modal v-model:open="activeTodo!.visible" title="Basic Modal" @ok="handleConfirmEdit" :centered="true">
        <a-form ref="formRef" :model="activeTodo" layout="vertical">
          <a-form-item label="标题" name="title">
            <a-input v-model:value="activeTodo!.title" placeholder="请输入标题" />
          </a-form-item>
          <a-form-item label="描述" name="description">
            <a-textarea v-model:value="activeTodo!.description" placeholder="请输入描述" :rows="4" />
          </a-form-item>
        </a-form>
      </a-modal>
    </el-scrollbar>
  </a-card>
</template>

<style scoped></style>
