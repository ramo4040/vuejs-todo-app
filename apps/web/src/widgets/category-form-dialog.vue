<script setup lang="ts">
import { computed, watch } from 'vue'
import { useForm, configure } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useCategoriesStore } from '@/entities/categories'
import { storeToRefs } from 'pinia'

const categoriesStore = useCategoriesStore()
const { isDialogOpen, isEdit } = storeToRefs(categoriesStore)
const { createCategory, updateCategory, closeDialog: storeCloseDialog } = categoriesStore

configure({
  validateOnInput: false,
  validateOnBlur: false,
})

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, 'Name is required').max(50, 'Name must be less than 50 characters'),
    color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Please select a valid color'),
  }),
)

const { handleSubmit, resetForm, setValues, meta } = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: '',
    color: '#3b82f6',
  },
})

// get curent category if editing
const currentCategory = computed(() => {
  if (!isEdit.value) return null
  return categoriesStore.categories.find((cat) => cat.id === isEdit.value)
})

// Watch for category changes and populate form
watch(
  [() => isDialogOpen.value, () => isEdit.value],
  () => {
    if (isDialogOpen.value) {
      if (currentCategory.value) {
        setValues({
          name: currentCategory.value.name,
          color: currentCategory.value.color,
        })
      } else {
        resetForm()
      }
    }
  },
  { immediate: true },
)

const onSubmit = handleSubmit(async (values) => {
  if (isEdit.value) {
    await updateCategory(isEdit.value, values)
  } else {
    await createCategory(values)
  }
  closeDialog()
})

const closeDialog = () => {
  resetForm()
  storeCloseDialog()
}
</script>

<template>
  <Dialog :open="isDialogOpen" @update:open="storeCloseDialog">
    <DialogContent class="sm:max-w-sm">
      <DialogHeader>
        <DialogTitle>{{ isEdit ? 'Edit Category' : 'Create New Category' }}</DialogTitle>
        <DialogDescription>
          {{
            isEdit
              ? 'Update the category name and color.'
              : 'Add a new category to organize your tasks.'
          }}
        </DialogDescription>
      </DialogHeader>

      <form @submit="onSubmit" class="space-y-4">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter category name..." v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="color">
          <FormItem>
            <FormLabel>Color</FormLabel>
            <FormControl>
              <input
                type="color"
                v-bind="componentField"
                class="w-10 h-10 rounded-md border border-gray-300 cursor-pointer"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <div class="flex gap-2 pt-4">
          <Button type="submit" class="flex-1 cursor-pointer" :disabled="!meta.valid">
            {{ isEdit ? 'Update' : 'Create' }}
          </Button>
          <Button
            type="button"
            variant="outline"
            @click="closeDialog"
            class="flex-1 cursor-pointer"
          >
            Cancel
          </Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>
