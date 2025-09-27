import { ref } from 'vue'

export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  timeout?: number
}

const notifications = ref<Notification[]>([])

export function useNotifications() {
  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 15)
    const newNotification: Notification = {
      id,
      timeout: 5000,
      ...notification
    }
    
    notifications.value.push(newNotification)
    
    if (newNotification.timeout && newNotification.timeout > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, newNotification.timeout)
    }
    
    return id
  }

  const removeNotification = (id: string) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const clearAll = () => {
    notifications.value = []
  }

  const success = (title: string, message: string = '') => {
    return addNotification({ type: 'success', title, message })
  }

  const error = (title: string, message: string = '') => {
    return addNotification({ type: 'error', title, message, timeout: 0 })
  }

  const warning = (title: string, message: string = '') => {
    return addNotification({ type: 'warning', title, message })
  }

  const info = (title: string, message: string = '') => {
    return addNotification({ type: 'info', title, message })
  }

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info
  }
}