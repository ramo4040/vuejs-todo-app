import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

// Login schema
export const loginSchema = toTypedSchema(
  z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(1, { message: 'Password is required' }),
  }),
)

// Forgot password schema
export const forgotPasswordSchema = toTypedSchema(
  z.object({
    email: z.string().email({ message: 'Invalid email address' }),
  }),
)

// Reset password schema
export const resetPasswordSchema = toTypedSchema(
  z
    .object({
      password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    }),
)

// Register schema
export const registerSchema = toTypedSchema(
  z
    .object({
      email: z.string().email({ message: 'Invalid email address' }),
      fullname: z.string().min(2, { message: 'Full name is required' }),
      password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
      confirmPassword: z.string(),
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
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    }),
)
