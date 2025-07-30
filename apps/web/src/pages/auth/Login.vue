<script setup lang="ts">
import { useForm } from 'vee-validate'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { loginSchema } from '../../entities/auth/config'
import { authValidationConfig } from './config/validation'
import { loginFields } from './config/fields'
import { useAuthStore } from '@/entities/auth'
import { useRouter } from 'vue-router'

authValidationConfig()
const { login } = useAuthStore()
const router = useRouter()

const { handleSubmit } = useForm({
  validationSchema: loginSchema,
  initialValues: {
    email: '',
    password: '',
  },
  validateOnMount: false,
})

const onSubmit = handleSubmit(async (values) => {
  await login(values)
  router.push({ name: 'Dashboard' })
})
</script>

<template>
  <div>
    <h1 class="text-4xl font-bold">Welcome Back</h1>
    <p class="text-gray-600">Please enter your details.</p>
  </div>

  <div>
    <form novalidate @submit.prevent="onSubmit" class="space-y-4 max-w-md mx-auto">
      <FormField
        v-for="field in loginFields"
        :key="field.name"
        :name="field.name"
        v-slot="{ componentField }"
      >
        <FormItem>
          <FormLabel>{{ field.label }}</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              :type="field.type"
              :placeholder="field.placeholder"
              class="w-full"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <div class="text-right">
        <router-link to="/auth/forgot-password" class="text-sm text-gray-600 hover:text-gray-800"
          >Forgot Password?</router-link
        >
      </div>

      <Button type="submit" class="w-full bg-gray-800 hover:bg-gray-900 text-white cursor-pointer">
        Log in
      </Button>

      <div class="text-center text-sm text-gray-600">
        Don't have an account?
        <router-link to="/auth/register" class="font-medium text-gray-800 hover:text-gray-900"
          >Sign up for free</router-link
        >
      </div>
    </form>
  </div>
</template>

<style scoped></style>
