import { defineStore } from 'pinia'
import type { CategoriesState, UpsertCategoryPayload } from '../types'
import { categoryApi } from '../api/categoryApi'

export const useCategoriesStore = defineStore('categories', {
  state: (): CategoriesState => ({
    categories: [],
    isEdit: null,
    isDialogOpen: false,
    selectedCategoryId: null,
    isLoading: false,
  }),
  actions: {
    async fetchCategories() {
      this.isLoading = true
      const response = await categoryApi.getAll()
      this.isLoading = false
      if (response.success) {
        this.categories = response.data || []
      }
    },
    async createCategory(payload: UpsertCategoryPayload) {
      const response = await categoryApi.create(payload)
      if (response.success && response.data) {
        this.categories.push(response.data)
        this.closeDialog()
      }
    },
    async updateCategory(id: number, payload: UpsertCategoryPayload) {
      const response = await categoryApi.update(id, payload)
      if (response.success && response.data) {
        const index = this.categories.findIndex((c) => c.id === id)
        if (index !== -1) this.categories[index] = response.data
        this.closeDialog()
      }
    },
    async deleteCategory(id: number) {
      const response = await categoryApi.delete(id)
      if (this.selectedCategoryId === id) this.selectedCategoryId = null
      if (response.success) this.categories = this.categories.filter((c) => c.id !== id)
      return response
    },
    openDialog(categoryId?: number) {
      this.isEdit = categoryId || null
      this.isDialogOpen = true
    },
    closeDialog() {
      this.isEdit = null
      this.isDialogOpen = false
    },
    selectCategory(categoryId: number) {
      this.selectedCategoryId = categoryId
    },
  },
})
