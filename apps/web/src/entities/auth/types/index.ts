import { z } from 'zod'
import {
  loginSchemaBase,
  registerSchemaBase,
  forgotPasswordSchemaBase,
  resetPasswordSchemaBase,
} from '../config'
import type { User } from '@/entities/user'

// Infer types from schemas
export type LoginData = z.infer<typeof loginSchemaBase>
export type RegisterData = z.infer<typeof registerSchemaBase>
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchemaBase>
export type ResetPasswordData = z.infer<typeof resetPasswordSchemaBase>

// Auth state type
export interface AuthState {
  user: User | null
}

export interface LoginResponseData {
  user: User
  access_token: string
  token_type: string
  expires_in: number
}

export interface RegisterResponseData {
  user: User
  access_token: string
}

export interface RefreshResponseData {
  access_token: string
}
