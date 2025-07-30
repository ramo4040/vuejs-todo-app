import { ref } from 'vue'

export const useMultiStepForm = () => {
  const currentTab = ref('step1')

  const handleTabChange = (value: string | number) => {
    currentTab.value = String(value)
  }

  return {
    currentTab,
    handleTabChange,
  }
}
