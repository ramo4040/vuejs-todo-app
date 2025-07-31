import { defineStore } from 'pinia'
import type { Notification } from '../types'
import { notificationApi } from '../api'

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    notifications: [] as Notification[],
    unreadCount: 0,
    isLoading: false,
  }),
  actions: {
    async fetchNotifications() {
      this.isLoading = true
      const response = await notificationApi.getNotifications()
      if (response.success && response.data) {
        this.notifications = response.data.data as Notification[]
      }
      this.isLoading = false
    },
    async fetchUnreadCount() {
      const response = await notificationApi.getCount()
      if (response.success && response.data) {
        this.unreadCount = response.data.unread_count
      }
    },
  },
})
