<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-vue-next'
import { useCategoriesStore, type Category } from '@/entities/categories'
import { RouterLink } from 'vue-router'

defineProps<{
  category: Category
}>()

const categoriesStore = useCategoriesStore()
const { deleteCategory, openDialog, selectCategory } = categoriesStore

const handleDeleteCategory = async (categoryId: number) => {
  try {
    await deleteCategory(categoryId)
  } catch (error) {
    console.error('Failed to delete category:', error)
  }
}
</script>

<template>
  <RouterLink to="/dashboard">
    <div
      :class="[
        'flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group',
        categoriesStore.selectedCategoryId === category.id ? 'bg-gray-50' : '',
      ]"
    >
      <div class="flex items-center gap-3 flex-1" @click="selectCategory(category.id)">
        <div
          class="w-4 h-4 rounded border-2"
          :style="{
            backgroundColor: category.color + '20',
            borderColor: category.color + '80',
          }"
        ></div>
        <span class="text-gray-900 font-medium">{{ category.name }}</span>
      </div>
      <div class="flex items-center gap-2">
        <Badge variant="secondary" class="bg-gray-100 text-gray-600 font-medium">
          {{ category.todos_count }}
        </Badge>

        <!-- Dropdown Menu for Edit/Delete -->
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button
              variant="ghost"
              size="sm"
              class="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6"
            >
              <MoreHorizontal class="w-4 h-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem @click="openDialog(category.id)"> Edit </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" @click="handleDeleteCategory(category.id)">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </RouterLink>
</template>
