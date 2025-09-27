<template>
  <div class="loading-container">
    <v-progress-circular
      :size="size"
      :width="width"
      color="primary"
      indeterminate
    ></v-progress-circular>
    <div v-if="message" class="loading-message mt-4">
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  size?: number
  width?: number
  message?: string
}

withDefaults(defineProps<Props>(), {
  size: 40,
  width: 4,
  message: ''
})
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.loading-message {
  text-align: center;
  color: var(--v-theme-on-surface);
  font-size: 0.875rem;
}
</style>