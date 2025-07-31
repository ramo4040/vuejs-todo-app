<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Plus, Bell } from 'lucide-vue-next'
import TodoItem from '@/widgets/todo/todo-item.vue'
import { useTodosStore } from '@/entities/todos'
import { useCategoriesStore } from '@/entities/categories'
import { onMounted, watch } from 'vue'
import TodoFormDialog from '@/widgets/todo/todo-form-dialog.vue'
import { useAuthStore } from '@/entities/auth'
import { echo } from '@/lib/utils'
import { toast } from 'vue-sonner'
import { RouterLink } from 'vue-router'
import { useNotificationsStore } from '@/entities/notification'
import { Skeleton } from '@/components/ui/skeleton'

const todosStore = useTodosStore()
const authStore = useAuthStore()
const { fetchTodosByCategory, openDialog } = todosStore
const categoriesStore = useCategoriesStore()
const notificationsStore = useNotificationsStore()

watch(
  () => categoriesStore.selectedCategoryId,
  async (newCategoryId) => {
    if (newCategoryId) {
      await fetchTodosByCategory(newCategoryId)
    }
  },
)

onMounted(async () => {
  await notificationsStore.fetchUnreadCount()
  echo.channel('todos').listen('.task.created', (e: { description: string; message: string }) => {
    toast.success(e.message, {
      position: 'top-center',
      description: e.description,
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
      <div class="font-medium flex items-center justify-between mb-2">
        <div>
          <h1 class="text-4xl text-black tracking-wide">
            Hello, {{ authStore.user?.full_name }} 👋
          </h1>
          <p class="text-xl text-gray-500">
            {{ formatDate() }}
          </p>
        </div>
        <div class="relative flex items-center ml-4">
          <RouterLink to="/dashboard/notifications" class="flex items-center">
            <Button variant="outline" size="icon" class="relative p-2 rounded-full cursor-pointer">
              <Bell class="text-gray-600" />
              <span
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border border-white"
                >{{ notificationsStore.unreadCount }}</span
              >
            </Button>
          </RouterLink>
        </div>
      </div>

      <div class="flex flex-col gap-2 flex-1 min-h-0 overflow-auto pr-2">
        <TodoItem
          v-if="todosStore.isLoading"
          v-for="todo in todosStore.todosMap.get(categoriesStore.selectedCategoryId as number)"
          :key="todo.id"
          :todo="todo"
        />
        <template v-else>
          <Skeleton class="h-8 w-full mb-1" v-for="i in 4" :key="i" />
        </template>
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
