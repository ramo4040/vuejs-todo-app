<script setup lang="ts">
import { useAuthStore } from '@/entities/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = async () => {
  await authStore.logout()
  router.push({ name: 'Login' })
}
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <h1 class="text-4xl font-bold mb-4">Dashboard</h1>
    <p class="text-gray-600 mb-8">Welcome, {{ authStore.user?.full_name || 'User' }}!</p>
    <Button @click="handleLogout" class="bg-red-500 hover:bg-red-600 text-white"> Logout </Button>
  </div>
</template>

<style scoped></style>
