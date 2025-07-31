export interface Todo {
  id: number
  title: string
  is_completed: boolean
  category_id: number
  created_at: string
  updated_at: string
}

export interface CreateTodoDto {
  title: string
  category_id: number
}

export interface UpdateTodoDto {
  title?: string
  is_completed?: boolean
  category_id?: number
}
