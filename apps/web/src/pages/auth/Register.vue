<script setup lang="ts">
import { useForm } from 'vee-validate'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ImageUpload from '@/components/ui/image-upload/ImageUpload.vue'
import { registerSchema } from './schemas'
import { authValidationConfig } from './config/validation'
import { registerStep1Fields, registerStep2Fields } from './config/fields'
import { useMultiStepForm } from './utils/form'

authValidationConfig()

const { currentTab, handleTabChange } = useMultiStepForm()

const { handleSubmit, values, setFieldValue, validateField, errors } = useForm({
  validationSchema: registerSchema,
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

const validateStep1 = async () => {
  await Promise.all([validateField('fullname'), validateField('email'), validateField('phone')])

  const { value } = errors

  if (!value.fullname && !value.email && !value.phone) {
    currentTab.value = 'step2'
  }
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
            v-for="field in registerStep1Fields"
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
            v-for="field in registerStep2Fields"
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
    <router-link to="/auth/login" class="font-medium text-gray-800 hover:text-gray-900">
      Log in here</router-link
    >
  </div>
</template>

<style scoped></style>
