type Category = {
  id: number
  name: string
  color: string
}

type CategoriesState = {
  categories: Category[]
  isEdit: number | null
  isDialogOpen: boolean
}

type UpsertCategoryPayload = {
  name: string
  color: string
}

export type { Category, CategoriesState, UpsertCategoryPayload }
