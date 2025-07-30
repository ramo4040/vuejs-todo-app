import { apiRequest } from '@/shared/api'
import type { Category, UpsertCategoryPayload } from '../types'

export const categoryApi = {
  getAll: async () => {
    return await apiRequest<Category[]>({
      method: 'GET',
      url: '/categories',
    })
  },
  create: async (payload: UpsertCategoryPayload) => {
    return await apiRequest<Category>({
      method: 'POST',
      url: '/categories',
      data: payload,
    })
  },
  update: async (id: number, payload: UpsertCategoryPayload) => {
    return await apiRequest<Category>({
      method: 'PUT',
      url: `/categories/${id}`,
      data: payload,
    })
  },
  delete: async (id: number) => {
    return await apiRequest({
      method: 'DELETE',
      url: `/categories/${id}`,
    })
  },
}
