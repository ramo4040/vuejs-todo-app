import { defineStore } from 'pinia'
import type { Todo, CreateTodoDto, UpdateTodoDto } from '../types'
import { todoApi } from '../api'
import { useCategoriesStore } from '@/entities/categories'

export const useTodosStore = defineStore('todos', {
  state: () => ({
    todosMap: new Map<number, Todo[]>(),
    isEdit: null as number | null,
    isDialogOpen: false,
    isLoading: false,
  }),
  actions: {
    async fetchTodosByCategory(categoryId: number) {
      const existingTodos = this.todosMap.get(categoryId)
      this.isLoading = true

      if (!existingTodos) {
        const response = await todoApi.getByCategory(categoryId)
        this.isLoading = false
        if (response.success) {
          this.todosMap.set(categoryId, response.data || [])
        }
      }
    },
    async createTodo(payload: CreateTodoDto) {
      const response = await todoApi.create(payload)
      if (response.success && response.data) {
        const categoryId = response.data.category_id
        const todos = this.todosMap.get(categoryId) || []
        this.todosMap.set(categoryId, [response.data, ...todos])

        const categoriesStore = useCategoriesStore()
        const category = categoriesStore.categories.find((c) => c.id === categoryId)
        if (category) category.todos_count++

        this.closeDialog()
      }
    },
    async updateTodo(id: number, payload: UpdateTodoDto) {
      const categoryId = payload.category_id
      if (categoryId == null) return

      const todos = this.todosMap.get(categoryId) || []

      const index = todos.findIndex((t) => t.id === id)
      if (index === -1) return

      const response = await todoApi.update(id, payload)

      if (response.success && response.data) {
        todos[index] = response.data
        this.todosMap.set(categoryId, [...todos])
        this.closeDialog()
      }
    },
    async deleteTodo(id: number, categoryId: number) {
      const todos = this.todosMap.get(categoryId) || []
      const response = await todoApi.delete(id)

      if (response.success) {
        this.todosMap.set(
          categoryId,
          todos.filter((t) => t.id !== id),
        )
        const categoriesStore = useCategoriesStore()
        const category = categoriesStore.categories.find((c) => c.id === categoryId)
        if (category && category.todos_count > 0) {
          category.todos_count--
        }
      }
    },
    openDialog(todoId?: number) {
      this.isDialogOpen = true
      this.isEdit = todoId || null
    },
    closeDialog() {
      this.isDialogOpen = false
      this.isEdit = null
    },
  },
})
