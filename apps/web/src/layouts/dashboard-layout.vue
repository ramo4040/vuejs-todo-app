<script setup lang="ts">
import Logo from '@/components/ui/logo/Logo.vue'
import { Button } from '@/components/ui/button'
import CategoryFormDialog from '@/widgets/category/category-form-dialog.vue'
import CategoryItem from '@/widgets/category/category-item.vue'
import UserProfile from '@/widgets/user-profile.vue'
import { Plus } from 'lucide-vue-next'
import { onMounted } from 'vue'
import { useCategoriesStore } from '@/entities/categories'
import { storeToRefs } from 'pinia'
import Skeleton from '@/components/ui/skeleton/Skeleton.vue'

const categoriesStore = useCategoriesStore()
let { categories, isLoading } = storeToRefs(categoriesStore)
const { fetchCategories, openDialog, selectCategory } = categoriesStore

onMounted(async () => {
  await fetchCategories()
  selectCategory(categories.value[0]?.id)
})
</script>

<template>
  <div class="flex h-screen w-full gap-10 bg-[#f6f6f6]">
    <!-- Sidebar -->
    <div class="min-w-[300px] bg-white rounded-r-4xl flex flex-col px-6 py-8">
      <!-- Logo Section -->
      <div class="mb-8">
        <div class="flex items-center gap-3">
          <Logo />
          <h1 class="font-semibold text-2xl text-gray-900">Todo</h1>
        </div>
      </div>

      <!-- Categories Section -->
      <div class="flex-1">
        <div class="mb-6">
          <h2 class="text-sm font-medium text-gray-600 mb-4">Categories</h2>
          <!-- Category item -->
          <div class="space-y-2">
            <CategoryItem
              v-if="!isLoading"
              v-for="category in categories"
              :key="category.id"
              :category="category"
            />
            <template v-else>
              <Skeleton class="h-8 w-full mb-2" v-for="i in 4" :key="i" />
            </template>
          </div>
        </div>

        <!-- Create New List Button -->
        <Button
          variant="outline"
          class="cursor-pointer w-full justify-center gap-2 border-dashed border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-700"
          @click="openDialog()"
        >
          <Plus class="w-4 h-4" />
          Create new list
        </Button>
      </div>

      <!-- Category Form Dialog -->
      <CategoryFormDialog />

      <!-- User Profile Section -->
      <UserProfile />
    </div>

    <!-- Main Content -->
    <div class="flex-1 bg-[#f6f6f6]">
      <router-view />
    </div>
  </div>
</template>

<style></style>
