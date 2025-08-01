import { defineStore } from 'pinia'
import { authApi } from '../api'
import type { AuthState, LoginData, RegisterData } from '../types'
import { tokenManager } from '@/shared/api'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
  }),

  actions: {
    async login(payload: LoginData) {
      const response = await authApi.login(payload)
      const { data } = response

      if (response.success && data) {
        this.user = data.user
        tokenManager.set(data.access_token)
      }

      return response
    },
    async register(payload: FormData) {
      const response = await authApi.register(payload)
      const { data } = response

      if (response.success && data) {
        this.user = data.user
        tokenManager.set(data.access_token)
      }

      return response
    },
    async logout() {
      await authApi.logout()
      tokenManager.remove()
      this.user = null
    },
    async getUser() {
      const response = await authApi.getUser()
      const { data } = response

      if (response.success && data) {
        this.user = data
      }

      return response
    },
  },
})
