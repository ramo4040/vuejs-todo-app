<script setup lang="ts">
import { useForm, configure } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const schema = toTypedSchema(
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

configure({
  validateOnInput: false,
  validateOnBlur: false,
})

const { handleSubmit, values } = useForm({
  validationSchema: schema,
  initialValues: {
    password: '',
    confirmPassword: '',
  },
  validateOnMount: false,
})

const onSubmit = handleSubmit((values) => {
  console.log('Reset password form submitted!', values)
})
</script>

<template>
  <div>
    <h1 class="text-4xl font-bold">Reset your password</h1>
    <p class="text-gray-600">Enter a new password to get back on track with your tasks.</p>
  </div>

  <div>
    <form novalidate @submit.prevent="onSubmit" class="space-y-4 max-w-md mx-auto">
      <FormField name="password" v-slot="{ componentField }">
        <FormItem>
          <FormLabel>New Password</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="password"
              placeholder="Enter your new password..."
              class="w-full"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField name="confirmPassword" v-slot="{ componentField }">
        <FormItem>
          <FormLabel>Confirm Password</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="password"
              placeholder="Re-enter your password..."
              class="w-full"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button type="submit" class="w-full bg-gray-800 hover:bg-gray-900 text-white">
        Reset Password
      </Button>

      <div class="text-center text-sm text-gray-600">
        Back to
        <router-link to="/login" class="font-medium text-gray-800 hover:text-gray-900"
          >Log in</router-link
        >
      </div>
    </form>
  </div>
</template>

<style scoped></style>
