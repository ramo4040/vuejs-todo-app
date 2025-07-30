import axios, { type AxiosRequestConfig, type AxiosError } from 'axios'
import type { GlobalResponse } from './type'
import { authApi } from '@/entities/auth'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

// Token management
export const tokenManager = {
  get: () => localStorage.getItem('auth_token'),
  set: (token: string) => localStorage.setItem('auth_token', token),
  remove: () => localStorage.removeItem('auth_token'),
}

// Navigation callback for handling redirects
let navigationCallback: ((path: string) => void) | null = null

export const setNavigationCallback = (callback: (path: string) => void) => {
  navigationCallback = callback
}

// Request interceptor
api.interceptors.request.use((config) => {
  const token = tokenManager.get()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const { data } = await authApi.refreshToken()

        if (data) {
          tokenManager.set(data.access_token)
          axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`
        }

        return axios(originalRequest)
      } catch (refreshError) {}
    }

    return Promise.reject(error)
  },
)

// Typed API request function
export const apiRequest = async <T>(config: AxiosRequestConfig): Promise<GlobalResponse<T>> => {
  try {
    const response = await api(config)
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError
    return {
      success: false,
      message: axiosError.message || 'An error occurred',
      status: axiosError.response?.status || 500,
    }
  }
}
