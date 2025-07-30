import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

// Base schemas for type inference
export const loginSchemaBase = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
})

// Login schema for vee-validate
export const loginSchema = toTypedSchema(loginSchemaBase)

// Base schema for forgot password
export const forgotPasswordSchemaBase = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
})

// Forgot password schema for vee-validate
export const forgotPasswordSchema = toTypedSchema(forgotPasswordSchemaBase)

// Base schema for reset password
export const resetPasswordSchemaBase = z
  .object({
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

// Reset password schema for vee-validate
export const resetPasswordSchema = toTypedSchema(resetPasswordSchemaBase)

// Base schema for register
export const registerSchemaBase = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    full_name: z.string().min(2, { message: 'Full name is required' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    password_confirmation: z.string(),
    phone: z.string().min(10, { message: 'Phone number is required' }),
    avatar: z
      .instanceof(File)
      .optional()
      .nullable()
      .refine(
        (file) => {
          if (!file) return true
          return file.size <= 10 * 1024 * 1024
        },
        { message: 'File size must be less than 10MB' },
      )
      .refine(
        (file) => {
          if (!file) return true
          return ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)
        },
        { message: 'Only JPEG, PNG, GIF, and WebP images are allowed' },
      ),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ['password_confirmation'],
  })

// Register schema for vee-validate
export const registerSchema = toTypedSchema(registerSchemaBase)
