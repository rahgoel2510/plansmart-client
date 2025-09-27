import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDarkMode = ref(false)
  const currentTheme = ref('orgPlannerTheme')

  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value
    currentTheme.value = isDarkMode.value ? 'orgPlannerDarkTheme' : 'orgPlannerTheme'
    localStorage.setItem('theme', currentTheme.value)
  }

  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      currentTheme.value = savedTheme
      isDarkMode.value = savedTheme === 'orgPlannerDarkTheme'
    }
  }

  return {
    isDarkMode,
    currentTheme,
    toggleTheme,
    initTheme
  }
})