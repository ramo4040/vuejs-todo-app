import { apiRequest } from '@/shared/api'
import type { NotificationResponseDto } from '../types'

export const notificationApi = {
  getCount: async () => {
    return await apiRequest<{ unread_count: number }>({
      method: 'GET',
      url: '/notifications/unread-count',
    })
  },
  getNotifications: async () => {
    return await apiRequest<NotificationResponseDto>({
      method: 'GET',
      url: '/notifications',
    })
  },
}
