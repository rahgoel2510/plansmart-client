<template>
  <v-snackbar
    v-for="notification in notifications"
    :key="notification.id"
    v-model="notification.show"
    :color="getColor(notification.type)"
    :timeout="notification.timeout"
    location="top right"
    class="notification-snackbar"
  >
    <div class="d-flex align-center">
      <v-icon class="mr-2">{{ getIcon(notification.type) }}</v-icon>
      <div>
        <div class="font-weight-medium">{{ notification.title }}</div>
        <div v-if="notification.message" class="text-caption">
          {{ notification.message }}
        </div>
      </div>
    </div>
    
    <template v-slot:actions>
      <v-btn
        icon="mdi-close"
        size="small"
        @click="removeNotification(notification.id)"
      ></v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useNotifications, type Notification } from '@/composables/useNotifications'

const { notifications: notificationList, removeNotification } = useNotifications()

const notifications = computed(() => 
  notificationList.value.map(n => ({
    ...n,
    show: true
  }))
)

const getColor = (type: Notification['type']) => {
  const colors = {
    success: 'success',
    error: 'error',
    warning: 'warning',
    info: 'info'
  }
  return colors[type]
}

const getIcon = (type: Notification['type']) => {
  const icons = {
    success: 'mdi-check-circle',
    error: 'mdi-alert-circle',
    warning: 'mdi-alert',
    info: 'mdi-information'
  }
  return icons[type]
}
</script>

<style scoped>
.notification-snackbar {
  margin-bottom: 0.5rem;
}
</style>