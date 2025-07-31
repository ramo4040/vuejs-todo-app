<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-vue-next'
import { useAuthStore } from '@/entities/auth'
import { useRouter } from 'vue-router'

const { user, logout } = useAuthStore()
const router = useRouter()

const handleLogout = async () => {
  try {
    await logout()
    router.push({ name: 'Login' })
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>

<template>
  <!-- User Profile Section -->
  <div class="mt-8 pt-6 border-t border-gray-200">
    <div class="flex items-center justify-between p-2 rounded-lg bg-gray-50 cursor-pointer">
      <div class="flex items-center gap-3">
        <Avatar class="w-10 h-10">
          <AvatarImage
            :src="`http://localhost:8000/storage/${user?.image}`"
            :alt="user?.full_name || 'User Avatar'"
          />
          <AvatarFallback class="bg-gray-200 text-gray-700">
            {{
              user?.full_name
                .split(' ')
                .map((n) => n[0])
                .join('')
            }}
          </AvatarFallback>
        </Avatar>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 truncate">{{ user?.full_name }}</p>
          <p class="text-xs text-gray-500 truncate">{{ user?.email }}</p>
        </div>
      </div>
      <Button variant="ghost" size="sm" class="p-2 h-8 w-8 cursor-pointer" @click="handleLogout">
        <LogOut class="w-4 h-4 text-gray-700" />
      </Button>
    </div>
  </div>
</template>
