<script setup lang="ts">
import { ref } from 'vue'
import { Upload, X } from 'lucide-vue-next'

const emit = defineEmits<{
  change: [file: File | null]
}>()

const fileInput = ref<HTMLInputElement>()
const imagePreview = ref<string>('')
const selectedFile = ref<File | null>(null)

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) processFile(file)
}

const processFile = (file: File) => {
  selectedFile.value = file
  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreview.value = e.target?.result as string
  }
  reader.readAsDataURL(file)
  emit('change', file)
}

const removeImage = () => {
  imagePreview.value = ''
  selectedFile.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
  emit('change', null)
}
</script>

<template>
  <div class="w-30 h-30">
    <div
      v-if="!imagePreview"
      class="w-full h-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors bg-gray-50 hover:border-blue-400 hover:bg-blue-50"
      @click="triggerFileInput"
    >
      <Upload class="w-6 h-6 text-gray-500 mb-2" />
      <p class="text-xs font-medium text-gray-700 m-0 text-center">
        Click to upload or drag and drop
      </p>
      <p class="text-xs text-gray-400 mt-1 m-0 text-center">PNG, JPG, GIF up to 10MB</p>
    </div>

    <div v-else class="w-full h-full relative">
      <img
        :src="imagePreview"
        alt="Preview"
        class="w-full h-full object-cover rounded-lg border-2 border-gray-200"
      />
      <button
        type="button"
        @click="removeImage"
        class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 border-0 rounded-full text-white cursor-pointer flex items-center justify-center shadow-md transition-colors"
      >
        <X class="w-4 h-4" />
      </button>
    </div>

    <input ref="fileInput" type="file" accept="image/*" @change="handleFileSelect" class="hidden" />
  </div>
</template>
