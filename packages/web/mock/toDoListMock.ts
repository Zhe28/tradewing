// 文件路径: mock/todolist.ts
import { MockMethod } from 'vite-plugin-mock'
import { faker } from '@faker-js/faker/locale/zh_CN'

// 生成随机待办事项
const generateTodos = (count: number, status: 'completed' | 'inProgress' | 'expired') => {
  return Array.from({ length: count }, (_, index) => {
    const createdAt = faker.date.recent({ days: 30 })
    const dueDate = new Date(createdAt)
    dueDate.setDate(dueDate.getDate() + faker.number.int({ min: 1, max: 14 }))

    let completedAt = null
    if (status === 'completed') {
      completedAt = new Date(createdAt)
      completedAt.setDate(completedAt.getDate() + faker.number.int({ min: 1, max: 7 }))
    }

    return {
      id: faker.string.uuid(),
      title: faker.lorem.sentence({ min: 3, max: 8 }),
      description: faker.lorem.paragraph(),
      priority: faker.helpers.arrayElement(['低', '中', '高']),
      status,
      createdAt: createdAt.toISOString(),
      dueDate: dueDate.toISOString(),
      completedAt: completedAt ? completedAt.toISOString() : null,
      tags: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () =>
        faker.helpers.arrayElement(['工作', '个人', '紧急', '家庭', '学习', '娱乐']),
      ),
    }
  })
}

// 模拟数据
const completedTodos = generateTodos(8, 'completed')
const inProgressTodos = generateTodos(5, 'inProgress')
const expiredTodos = generateTodos(3, 'expired')

// 所有待办事项
const allTodos = [...completedTodos, ...inProgressTodos, ...expiredTodos]

export default [
  // 获取所有待办事项
  {
    url: '/api/todos',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: allTodos,
        message: '获取成功',
      }
    },
  },

  // 根据状态获取待办事项
  {
    url: '/api/todos/:status',
    method: 'get',
    response: (req) => {
      const { status } = req.params

      let data = []
      switch (status) {
        case 'completed':
          data = completedTodos
          break
        case 'inProgress':
          data = inProgressTodos
          break
        case 'expired':
          data = expiredTodos
          break
        default:
          return {
            code: 400,
            message: '无效的状态参数',
          }
      }

      return {
        code: 200,
        data,
        message: '获取成功',
      }
    },
  },

  // 添加新待办事项
  {
    url: '/api/todos',
    method: 'post',
    response: (req) => {
      const { body } = req
      const newTodo = {
        id: faker.string.uuid(),
        ...body,
        createdAt: new Date().toISOString(),
      }

      // 根据状态添加到对应数组
      if (body.status === 'completed') {
        completedTodos.push(newTodo)
      } else if (body.status === 'inProgress') {
        inProgressTodos.push(newTodo)
      } else if (body.status === 'expired') {
        expiredTodos.push(newTodo)
      }

      return {
        code: 201,
        data: newTodo,
        message: '创建成功',
      }
    },
  },

  // 更新待办事项
  {
    url: '/api/todos/:id',
    method: 'put',
    response: (req) => {
      const { id } = req.params
      const { body } = req

      // 在所有数组中查找并更新
      const todoIndex = allTodos.findIndex((todo) => todo.id === id)

      if (todoIndex === -1) {
        return {
          code: 404,
          message: '待办事项不存在',
        }
      }

      // 更新待办事项
      allTodos[todoIndex] = {
        ...allTodos[todoIndex],
        ...body,
        updatedAt: new Date().toISOString(),
      }

      return {
        code: 200,
        data: allTodos[todoIndex],
        message: '更新成功',
      }
    },
  },

  // 删除待办事项
  {
    url: '/api/todos/:id',
    method: 'delete',
    response: (req) => {
      const { id } = req.params

      // 在所有数组中查找并删除
      const todoIndex = allTodos.findIndex((todo) => todo.id === id)

      if (todoIndex === -1) {
        return {
          code: 404,
          message: '待办事项不存在',
        }
      }

      // 根据要删除的待办事项状态，从对应的数组中删除
      const todo = allTodos[todoIndex]
      if (todo.status === 'completed') {
        const index = completedTodos.findIndex((item) => item.id === id)
        if (index !== -1) completedTodos.splice(index, 1)
      } else if (todo.status === 'inProgress') {
        const index = inProgressTodos.findIndex((item) => item.id === id)
        if (index !== -1) inProgressTodos.splice(index, 1)
      } else if (todo.status === 'expired') {
        const index = expiredTodos.findIndex((item) => item.id === id)
        if (index !== -1) expiredTodos.splice(index, 1)
      }

      // 从总列表中删除
      allTodos.splice(todoIndex, 1)

      return {
        code: 200,
        message: '删除成功',
      }
    },
  },
] as MockMethod[]
