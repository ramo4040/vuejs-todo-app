type Category = {
  id: number
  name: string
  color: string
  todos_count: number
}

type CategoriesState = {
  categories: Category[]
  isEdit: number | null
  isDialogOpen: boolean
  selectedCategoryId: number | null
  isLoading?: boolean
}

type UpsertCategoryPayload = {
  name: string
  color: string
}

export type { Category, CategoriesState, UpsertCategoryPayload }
