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
import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useTodosStore } from '@/entities/todos/model/todos-model'
import { storeToRefs } from 'pinia'
import { useCategoriesStore } from '@/entities/categories'

const todosStore = useTodosStore()
const categoriesStore = useCategoriesStore()
const { isDialogOpen, isEdit } = storeToRefs(todosStore)
const { createTodo, updateTodo, closeDialog: storeCloseDialog } = todosStore

configure({
  validateOnInput: false,
  validateOnBlur: false,
})

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(1, 'Title is required').max(255, 'Max 255 characters'),
    is_completed: z.boolean().optional(),
  }),
)

const { handleSubmit, resetForm, setValues, meta } = useForm({
  validationSchema: formSchema,
  initialValues: {
    title: '',
    is_completed: false,
  },
})

// get current todo if editing
const currentTodo = computed(() => {
  if (!isEdit.value) return null

  const todo = todosStore.todosMap
    .get(categoriesStore.selectedCategoryId as number)
    ?.find((t) => t.id === isEdit.value)

  return todo
})

// Watch for dialog open and populate form
watch(
  [() => isDialogOpen.value, () => isEdit.value],
  () => {
    if (isDialogOpen.value) {
      if (currentTodo.value) {
        setValues({
          title: currentTodo.value.title,
          is_completed: currentTodo.value.is_completed,
        })
      } else {
        resetForm()
      }
    }
  },
  { immediate: true },
)

const onSubmit = handleSubmit(async (values) => {
  const categoryId = categoriesStore.selectedCategoryId

  if (categoryId) {
    const todo = {
      ...values,
      category_id: categoryId,
    }

    if (isEdit.value) {
      await updateTodo(isEdit.value, todo)
    } else {
      categoriesStore.selectedCategoryId && (await createTodo(todo))
      const category = categoriesStore.categories.find((c) => c.id === categoryId)
      if (category) category.todos_count++
    }
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
        <DialogTitle>{{ isEdit ? 'Edit Todo' : 'Create New Todo' }}</DialogTitle>
        <DialogDescription>
          {{
            isEdit
              ? 'Update the todo title and completion status.'
              : 'Add a new todo to your selected category.'
          }}
        </DialogDescription>
      </DialogHeader>

      <form @submit="onSubmit" class="space-y-4">
        <FormField v-slot="{ componentField }" name="title">
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="Enter todo title..." v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ value, handleChange }" type="checkbox" name="is_completed">
          <FormItem>
            <FormLabel>Completed</FormLabel>
            <FormControl>
              <Checkbox :model-value="value" @update:model-value="handleChange" />
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

<style scoped></style>
