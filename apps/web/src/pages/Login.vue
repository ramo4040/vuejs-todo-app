<script setup lang="ts">
import { useForm, configure } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const schema = toTypedSchema(
  z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(1, { message: 'Password is required' }),
  }),
)

configure({
  validateOnInput: false,
  validateOnBlur: false,
})

const { handleSubmit, values } = useForm({
  validationSchema: schema,
  initialValues: {
    email: '',
    password: '',
  },
  validateOnMount: false,
})

const onSubmit = handleSubmit((values) => {
  console.log('Login form submitted!', values)
})
</script>

<template>
  <div>
    <h1 class="text-4xl font-bold">Welcome Back</h1>
    <p class="text-gray-600">Please enter your details.</p>
  </div>

  <div>
    <form novalidate @submit.prevent="onSubmit" class="space-y-4 max-w-md mx-auto">
      <FormField name="email" v-slot="{ componentField }">
        <FormItem>
          <FormLabel>E-mail address</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="email"
              placeholder="Enter your e-mail address..."
              class="w-full"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField name="password" v-slot="{ componentField }">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="password"
              placeholder="Enter your password..."
              class="w-full"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <div class="text-right">
        <router-link to="/forgot-password" class="text-sm text-gray-600 hover:text-gray-800"
          >Forgot Password?</router-link
        >
      </div>

      <Button type="submit" class="w-full bg-gray-800 hover:bg-gray-900 text-white">
        Log in
      </Button>

      <div class="text-center text-sm text-gray-600">
        Don't have an account?
        <router-link to="/register" class="font-medium text-gray-800 hover:text-gray-900"
          >Sign up for free</router-link
        >
      </div>
    </form>
  </div>
</template>

<style scoped></style>
