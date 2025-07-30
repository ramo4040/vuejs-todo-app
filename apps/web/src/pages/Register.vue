<script setup lang="ts">
import AuthLayout from '@/layouts/AuthLayout.vue'
import { useForm, configure } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import ImageUpload from '@/components/ui/image-upload/ImageUpload.vue'

const schema = toTypedSchema(
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

configure({
  validateOnInput: false,
  validateOnBlur: false,
})

const { handleSubmit, values, setFieldValue } = useForm({
  validationSchema: schema,
  initialValues: {
    email: '',
    fullname: '',
    password: '',
    confirmPassword: '',
    phone: '',
    avatar: null,
  },
  validateOnMount: false,
})

const handleAvatarChange = (file: File | null) => {
  setFieldValue('avatar', file)
}

const formFields = [
  {
    name: 'fullname',
    label: 'Full Name',
    type: 'text',
    placeholder: 'Enter your full name',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
  },
  {
    name: 'phone',
    label: 'Phone Number',
    type: 'tel',
    placeholder: 'Enter phone number',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    placeholder: 'Confirm your password',
  },
]

const onSubmit = handleSubmit((values) => {
  console.log('Form submitted!', values)
})
</script>

<template>
  <AuthLayout
    title="Create your account"
    description="Start organizing your tasks and stay productive every day."
  >
    <form novalidate @submit.prevent="onSubmit" class="space-y-2.5 max-w-md mx-auto">
      <FormField
        v-for="field in formFields"
        :key="field.name"
        :name="field.name"
        v-slot="{ componentField }"
      >
        <FormItem>
          <FormLabel>{{ field.label }}</FormLabel>
          <FormControl>
            <Input v-bind="componentField" :type="field.type" :placeholder="field.placeholder" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField name="avatar" v-slot="{ componentField }">
        <FormItem>
          <FormLabel>Profile Picture (Optional)</FormLabel>
          <FormControl>
            <ImageUpload @change="handleAvatarChange" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button type="submit" class="mt-4 w-full cursor-pointer">Sign Up</Button>
    </form>
  </AuthLayout>
</template>

<style scoped></style>
