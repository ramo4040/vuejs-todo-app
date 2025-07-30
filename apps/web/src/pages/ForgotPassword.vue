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
  },
  validateOnMount: false,
})

const onSubmit = handleSubmit((values) => {
  console.log('Forgot password form submitted!', values)
})
</script>

<template>
  <div>
    <h1 class="text-4xl font-bold">Forgot Password</h1>
    <p class="text-gray-600">No worries! Enter your email address to reset it.</p>
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

      <Button type="submit" class="w-full bg-gray-800 hover:bg-gray-900 text-white">
        Send reset link
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
