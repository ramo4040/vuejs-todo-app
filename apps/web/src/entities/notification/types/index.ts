export interface Notification {
  id: string
  data: {
    description: string
  }
  created_at: string
}

export interface NotificationResponseDto {
  data: Notification[]
  path: string
  per_page: number
  next_cursor: string | null
  next_page_url: string | null
  prev_cursor: string | null
  prev_page_url: string | null
}
