import { computed, ref } from 'vue'
import type { CardTabListType } from 'ant-design-vue/es/card/Card'
import { fetchAllTodos, deleteTodo } from '@/utils/http/dashboard/toDoListRequest.ts'

// 所有的 todolist 列表
export const todos = ref<todoType[]>()

export const filterList = computed(() => {
  return todos.value?.filter((todo: todoType) => activeTab.value === todo.status)
})
// 获取数据内容
fetchAllTodos().then((res) => {
  console.log(`获取todolist数据内容`, res)
  todos.value = res
})

export const title = ref('待办事项')
export const tabList: CardTabListType[] = [
  {
    key: 'inProgress',
    tab: '进行中',
  },
  {
    key: 'completed',
    tab: '已完成',
  },
  {
    key: 'expired',
    tab: '已失效',
  },
]
// 默认激活第一个 tabbar
export const activeTab = ref(tabList[0].key)

/**
 * 删除TodoList
 * @param item {todoType}
 */
function handleDeleteToDo(item: todoType) {
  deleteTodo(item.id).then(res=>{
    // 如果删除成功，从 todos 中删除
    if(res?.code === 200 && todos.value) {
      todos.value.splice(todos.value.indexOf(item), 1)
    }
  })
}



export { handleDeleteToDo  }