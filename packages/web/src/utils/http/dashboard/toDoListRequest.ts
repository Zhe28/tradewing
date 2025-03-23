// 在您的 Vue 组件中使用这些 API
import { http } from '@/utils/http/http.ts'

// 获取所有待办事项
const fetchAllTodos = async () => {
  try {
    const response = await http.get<responseType<todoType[]>>('/api/todos')
    return response.data.data
  } catch (error) {
    console.error('获取待办事项失败', error)
  }
}

// 根据状态获取待办事项
const fetchTodosByStatus = async (status: statusType) => {
  try {
    const response = await http.get(`/api/todos/${status}`)
    return response.data
  } catch (error) {
    console.error(`获取${status}待办事项失败`, error)
  }
}

// 添加新待办事项
const addTodo = async (todo: todoType) => {
  try {
    const response = await http.post('/api/todos', todo)
    return response.data.data
  } catch (error) {
    console.error('添加待办事项失败', error)
    return null
  }
}

// 更新待办事项
const updateTodo = async (id: string, todo: todoType) => {
  try {
    const response = await http.put(`/api/todos/${id}`, todo)
    return response.data.data
  } catch (error) {
    console.error('更新待办事项失败', error)
    return null
  }
}

// 删除待办事项
const deleteTodo = async (id: string) => {
  try {
    const response = await http.delete<responseType<unknown>>(`/api/todos/${id}`)
    return response.data
  } catch (error) {
    console.error('删除待办事项失败', error)
    return null
  }
}

export { fetchAllTodos, fetchTodosByStatus, addTodo, updateTodo, deleteTodo }
