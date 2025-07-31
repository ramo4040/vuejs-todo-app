<script setup lang="ts">
import { onMounted } from 'vue'
import { useNotificationsStore } from '@/entities/notification'
import Skeleton from '@/components/ui/skeleton/Skeleton.vue'

const notificationsStore = useNotificationsStore()

onMounted(() => {
  notificationsStore.fetchNotifications()
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<template>
  <div class="container mx-auto py-10 flex flex-col items-center">
    <h2 class="text-2xl font-bold mb-6">Notifications</h2>
    <div class="w-full max-w-lg flex flex-col gap-4">
      <div
        v-for="notification in notificationsStore.notifications"
        :key="notification.id"
        class="border rounded-lg p-4 bg-white shadow-sm flex flex-col gap-2"
      >
        <div class="text-gray-800 text-base">{{ notification.data.description }}</div>
        <div class="text-xs text-gray-500">{{ formatDate(notification.created_at) }}</div>
      </div>
      <template v-if="notificationsStore.isLoading">
        <Skeleton class="h-16 w-full mb-1" v-for="i in 4" :key="i" />
      </template>
      <div
        v-if="!notificationsStore.isLoading && notificationsStore.notifications.length === 0"
        class="text-center py-4 text-gray-400"
      >
        No notifications found.
      </div>
    </div>
  </div>
</template>
