<script setup lang="ts">
import Logo from '@/components/ui/logo/Logo.vue'
</script>

<template>
  <div class="h-screen grid grid-cols-[650px_1fr]">
    <div class="flex flex-col gap-10 p-16">
      <Logo />

      <div class="flex-1 flex items-center justify-center">
        <div class="w-[380px] grid gap-6">
          <router-view />
        </div>
      </div>
    </div>

    <div class="bg-white px-15 py-10">
      <div class="h-full w-full rounded-4xl overflow-hidden relative flex items-end">
        <img
          src="/auth-img.jpg"
          alt="Auth layout image"
          class="w-full h-full absolute object-cover rotate-180"
        />
        <h1 class="text-white text-5xl font-bold relative z-1 p-10">
          Stay focused. <br />
          Stay organized. Get things done.
        </h1>
      </div>
    </div>
  </div>
</template>
