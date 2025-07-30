<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Edit, Trash2 } from 'lucide-vue-next'
import { useCategoriesStore, type Category } from '@/entities/categories'

defineProps<{
  category: Category
}>()

const categoriesStore = useCategoriesStore()
const { deleteCategory, openDialog } = categoriesStore

const handleDeleteCategory = async (categoryId: number) => {
  try {
    await deleteCategory(categoryId)
  } catch (error) {
    console.error('Failed to delete category:', error)
  }
}
</script>

<template>
  <div
    class="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
  >
    <div class="flex items-center gap-3">
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
          <DropdownMenuItem @click="openDialog(category.id)">
            <Edit class="w-4 h-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            @click="handleDeleteCategory(category.id)"
            class="text-red-600 focus:text-red-600"
          >
            <Trash2 class="w-4 h-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
</template>
