import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

;(window as any).Pusher = Pusher

export const echo = new Echo({
  broadcaster: 'pusher',
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: 'eu',
  forceTLS: true,
})
