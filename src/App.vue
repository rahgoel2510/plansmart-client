<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'
import AppFooter from '@/components/AppFooter.vue'
import NotificationContainer from '@/components/NotificationContainer.vue'

const route = useRoute()
const authStore = useAuthStore()
const themeStore = useThemeStore()

const isAuthenticated = computed(() => authStore.isAuthenticated)
const currentTheme = computed(() => themeStore.currentTheme)
const isDarkMode = computed(() => themeStore.isDarkMode)

const showNavigation = computed(() => {
  const hideNavRoutes = ['/login', '/register']
  const isOrgLogin = route.path.includes('/login') || route.path.match(/^\/[^/]+$/) // org slug or org login
  return !hideNavRoutes.includes(route.path) && !isOrgLogin && isAuthenticated.value
})

const toggleTheme = () => {
  themeStore.toggleTheme()
}

const logout = () => {
  authStore.logout()
}

onMounted(() => {
  themeStore.initTheme()
  authStore.initAuth()
})
</script>

<template>
  <v-app :theme="currentTheme" class="app-container">
    <v-navigation-drawer
      v-if="showNavigation"
      app
      permanent
      width="280"
      class="enterprise-sidebar"
    >
      <v-list>
        <v-list-item class="px-4 py-3">
          <div class="d-flex align-center">
            <img src="@/assets/plansmart-logo.svg" alt="PlanSmart" height="32" class="mr-3">
            <div>
              <div class="text-h6 text-primary font-weight-bold">PlanSmart</div>
              <div class="text-caption text-medium-emphasis">Enterprise</div>
            </div>
          </div>
        </v-list-item>
        
        <v-divider></v-divider>
        
        <v-list-item to="/" prepend-icon="mdi-view-dashboard">
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>
        
        <v-list-item to="/organizations" prepend-icon="mdi-office-building">
          <v-list-item-title>Organizations</v-list-item-title>
        </v-list-item>
        
        <v-list-item to="/analytics" prepend-icon="mdi-chart-line">
          <v-list-item-title>Analytics</v-list-item-title>
        </v-list-item>
        
        <v-list-item to="/settings" prepend-icon="mdi-cog">
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item>
      </v-list>
      
      <template v-slot:append>
        <div class="pa-2">
          <v-btn
            block
            @click="toggleTheme"
            prepend-icon="mdi-theme-light-dark"
          >
            {{ isDarkMode ? 'Light' : 'Dark' }} Mode
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar v-if="showNavigation" app color="primary" dark>
      <v-app-bar-title>PlanSmart Enterprise</v-app-bar-title>
      
      <v-spacer></v-spacer>
      
      <v-btn
        v-if="isAuthenticated"
        @click="logout"
        prepend-icon="mdi-logout"
      >
        Logout
      </v-btn>
    </v-app-bar>

    <v-main class="main-content">
      <v-container v-if="showNavigation" fluid>
        <RouterView />
      </v-container>
      <RouterView v-else />
    </v-main>

    <AppFooter v-if="showNavigation" />
    <NotificationContainer />
  </v-app>
</template>

<style>
/* Global styles for full height layout */
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

#app {
  height: 100vh;
  width: 100vw;
}

.app-container {
  height: 100vh !important;
  width: 100vw !important;
}

.main-content {
  height: 100% !important;
}

/* Ensure login pages take full height */
.login-container {
  height: 100vh !important;
  width: 100vw !important;
}
</style>
