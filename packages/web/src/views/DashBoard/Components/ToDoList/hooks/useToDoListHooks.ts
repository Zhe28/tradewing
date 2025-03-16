import { computed, ref } from 'vue'
import type { CardTabListType } from 'ant-design-vue/es/card/Card'
import { fetchAllTodos } from '@/utils/http/dashboard/toDoListRequest.ts'

// 所有的 todolist 列表
export const todos = ref<todoType[]>()

export const filterList = computed(() => {
  return todos.value?.filter((todo: todoType) => activeTab.value === todo.status)
})
// 获取数据内容
fetchAllTodos().then((res) => {
  console.log(res)
  todos.value = res
})
export const title = ref('待办事项')
export const tabList: CardTabListType[] = [
  {
    key: 'completed',
    tab: '已完成',
  },
  {
    key: 'inProgress',
    tab: '进行中',
  },
  {
    key: 'expired',
    tab: '已失效',
  },
]
export const activeTab = ref(tabList[0].key)
