<template>
  <input v-bind="$attrs" class="shadcn-input" />
</template>

<script setup lang="ts">
// Basic input component for shadcn/ui
</script>

<style scoped>
.shadcn-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}
.shadcn-input:focus {
  border-color: #6366f1;
}
</style>
