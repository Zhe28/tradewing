type statusType = 'completed' | 'inProgress' | 'expired'

interface responseType<T> {
  code: number
  data: T
  message: string
}

type todoType = {
  id: string
  title: string
  description: string
  priority: string
  status: statusType
  createdAt: string
  dueDate: string
  completedAt: string
  tags: string[]
}
