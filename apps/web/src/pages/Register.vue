<script setup lang="ts">
import { ref } from 'vue'
import { useForm, configure } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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

const currentTab = ref('step1')

const { handleSubmit, values, setFieldValue, validateField, errors } = useForm({
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

const step1Fields = [
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
]

const step2Fields = [
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

const validateStep1 = async () => {
  await Promise.all([validateField('fullname'), validateField('email'), validateField('phone')])

  const { value } = errors

  if (!value.fullname && !value.email && !value.phone) {
    currentTab.value = 'step2'
  }
}

const handleTabChange = (value: string | number) => {
  currentTab.value = String(value)
  console.log(values)
}

const onSubmit = handleSubmit((values) => {
  console.log('Form submitted!', values)
})
</script>

<template>
  <div>
    <h1 class="text-4xl font-bold">Create your account</h1>
    <p class="text-gray-600">Start organizing your tasks and stay productive every day.</p>
  </div>

  <div>
    <Tabs
      :model-value="currentTab"
      @update:model-value="handleTabChange"
      class="w-full max-w-md mx-auto"
    >
      <TabsList class="grid w-full grid-cols-2">
        <TabsTrigger value="step1" class="text-sm pointer-events-none"> Personal Info </TabsTrigger>
        <TabsTrigger value="step2" class="text-sm pointer-events-none">
          Security & Profile
        </TabsTrigger>
      </TabsList>

      <form novalidate @submit.prevent="onSubmit" class="mt-6">
        <TabsContent v-show="currentTab === 'step1'" value="step1" class="space-y-2.5" force-mount>
          <FormField
            v-for="field in step1Fields"
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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <Button type="button" @click="validateStep1" class="mt-4 w-full cursor-pointer">
            Continue
          </Button>
        </TabsContent>

        <TabsContent v-show="currentTab === 'step2'" value="step2" class="space-y-2.5" force-mount>
          <FormField
            v-for="field in step2Fields"
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
                />
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

          <div class="space-y-2">
            <Button
              type="button"
              @click="currentTab = 'step1'"
              variant="outline"
              class="w-full cursor-pointer"
            >
              Go Back
            </Button>
            <Button type="submit" class="w-full cursor-pointer"> Create Account </Button>
          </div>
        </TabsContent>
      </form>
    </Tabs>
  </div>

  <div class="text-center text-sm text-gray-600">
    Already have an account?
    <router-link to="/login" class="font-medium text-gray-800 hover:text-gray-900">
      Log in here</router-link
    >
  </div>
</template>

<style scoped></style>
