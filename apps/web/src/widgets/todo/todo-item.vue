<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { useTodosStore, type Todo } from '@/entities/todos'
import { EllipsisVertical } from 'lucide-vue-next'

const { todo } = defineProps<{
  todo: Todo
}>()

const { deleteTodo, openDialog, updateTodo } = useTodosStore()

const handleDeleteTodo = async () => {
  await deleteTodo(todo.id, todo.category_id)
}

const handleUpdateIsCompletedTodo = async (val: boolean) => {
  todo.is_completed = !!val
  await updateTodo(todo.id, todo)
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<template>
  <div
    class="bg-white flex items-center justify-between h-12 p-3 rounded-lg shadow-sm border border-gray-200 w-full max-full"
  >
    <!-- Left side: checkbox and title -->
    <div class="flex items-center gap-4">
      <Checkbox
        :model-value="todo.is_completed"
        @update:model-value="
          (val) => {
            handleUpdateIsCompletedTodo(!!val)
          }
        "
        class="cursor-pointer data-[state=checked]:bg-primary data-[state=checked]:border-primary"
      />
      <p class="font-medium text-lg text-black">
        {{ todo.title }}
      </p>
    </div>
    <!-- Right -->
    <div class="flex items-center gap-2.5">
      <Badge variant="secondary" class="text-sm font-medium">
        {{ formatDate(todo.created_at) }}
      </Badge>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button
            variant="ghost"
            size="icon"
            class="cursor-pointer h-6 w-6 p-0 bg-gray-200 hover:bg-gray-300 rounded"
          >
            <EllipsisVertical class="w-4 h-4 text-gray-600" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem @click="openDialog(todo.id)"> Edit </DropdownMenuItem>
          <DropdownMenuItem variant="destructive" @click="handleDeleteTodo">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
</template>

<style scoped></style>
