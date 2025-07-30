import type {
  LoginData,
  LoginResponseData,
  RefreshResponseData,
  RegisterData,
  RegisterResponseData,
} from '../types'
import type { GlobalResponse } from '../../../shared/type'
import { apiRequest } from '@/shared/api'
import type { User } from '@/entities/user/types'

export const authApi = {
  async login(data: LoginData): Promise<GlobalResponse<LoginResponseData>> {
    return apiRequest({
      method: 'POST',
      url: '/auth/login',
      data,
    })
  },
  async register(data: RegisterData): Promise<GlobalResponse<RegisterResponseData>> {
    return apiRequest({
      method: 'POST',
      url: '/auth/register',
      data,
    })
  },
  async logout(): Promise<GlobalResponse<void>> {
    return apiRequest({
      method: 'POST',
      url: '/auth/logout',
    })
  },
  async refreshToken(): Promise<GlobalResponse<RefreshResponseData>> {
    return apiRequest({
      method: 'POST',
      url: '/auth/refresh',
    })
  },
  async getUser(): Promise<GlobalResponse<User>> {
    return apiRequest({
      method: 'GET',
      url: '/auth/user',
    })
  },
}
