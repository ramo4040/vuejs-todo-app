<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-vue-next'
import TodoItem from '@/widgets/todo/todo-item.vue'
import { useTodosStore } from '@/entities/todos'
import { useCategoriesStore } from '@/entities/categories'
import { onMounted, watch } from 'vue'
import TodoFormDialog from '@/widgets/todo/todo-form-dialog.vue'
import { useAuthStore } from '@/entities/auth'
import { echo } from '@/lib/utils'
import Sonner from '@/components/ui/sonner/Sonner.vue'
import { toast } from 'vue-sonner'

const todosStore = useTodosStore()
const authStore = useAuthStore()
const { fetchTodosByCategory, openDialog } = todosStore
const categoriesStore = useCategoriesStore()

watch(
  () => categoriesStore.selectedCategoryId,
  async (newCategoryId) => {
    if (newCategoryId) {
      await fetchTodosByCategory(newCategoryId)
    }
  },
)

onMounted(() => {
  echo
    .channel('todos')
    .listen('.task.created', (e: { title: string; category: string; message: string }) => {
      toast.success(e.message, {
        position: 'top-center',
        description: `Title: ${e.title.slice(0, 50)}${e.title.length > 50 ? '...' : ''} | Category: ${e.category}`,
      })
    })
})

const formatDate = () => {
  const now = new Date()
  return now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
</script>

<template>
  <div class="flex flex-col gap-2.5 h-full pb-10">
    <div class="flex flex-col gap-9 flex-1 overflow-hidden pb-0 pl-2.5 pr-20 pt-20">
      <div class="font-medium">
        <h1 class="text-4xl text-black mb-2 tracking-wide">
          Hello, {{ authStore.user?.full_name }} 👋
        </h1>
        <p class="text-xl text-gray-500">
          {{ formatDate() }}
        </p>
      </div>

      <div class="flex flex-col gap-2 flex-1 min-h-0 overflow-auto pr-2">
        <TodoItem
          v-for="todo in todosStore.todosMap.get(categoriesStore.selectedCategoryId as number)"
          :key="todo.id"
          :todo="todo"
        />
      </div>
    </div>

    <div class="flex items-center justify-center p-2.5">
      <Button variant="default" class="cursor-pointer" @click="openDialog()">
        <Plus class="w-6 h-6" />
        <span class="text-base tracking-wide">Create new task</span>
      </Button>
    </div>
  </div>

  <TodoFormDialog />
</template>

<style scoped></style>
