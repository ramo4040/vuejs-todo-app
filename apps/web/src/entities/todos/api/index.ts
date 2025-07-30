import { apiRequest } from '@/shared/api'
import type { Todo, CreateTodoDto, UpdateTodoDto } from '../types'

export const todoApi = {
  getByCategory: async (categoryId: number) => {
    return await apiRequest<Todo[]>({
      method: 'GET',
      url: `/categories/${categoryId}/todos`,
    })
  },
  create: async (payload: CreateTodoDto) => {
    return await apiRequest<Todo>({
      method: 'POST',
      url: '/todos',
      data: payload,
    })
  },
  update: async (id: number, payload: UpdateTodoDto) => {
    return await apiRequest<Todo>({
      method: 'PUT',
      url: `/todos/${id}`,
      data: payload,
    })
  },
  delete: async (id: number) => {
    return await apiRequest({
      method: 'DELETE',
      url: `/todos/${id}`,
    })
  },
}
