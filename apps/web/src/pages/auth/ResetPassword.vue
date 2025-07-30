<script setup lang="ts">
import { useForm } from 'vee-validate'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { resetPasswordSchema } from '../../entities/auth/config'
import { authValidationConfig } from './config/validation'
import { resetPasswordFields } from './config/fields'

authValidationConfig()

const { handleSubmit, values } = useForm({
  validationSchema: resetPasswordSchema,
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
      <FormField
        v-for="field in resetPasswordFields"
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

      <Button type="submit" class="w-full bg-gray-800 hover:bg-gray-900 text-white cursor-pointer">
        Reset Password
      </Button>

      <div class="text-center text-sm text-gray-600">
        Back to
        <router-link to="/auth/login" class="font-medium text-gray-800 hover:text-gray-900"
          >Log in</router-link
        >
      </div>
    </form>
  </div>
</template>

<style scoped></style>
