<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
    >
      <v-list-item
        :prepend-avatar="!rail ? 'https://randomuser.me/api/portraits/men/85.jpg' : undefined"
        :title="!rail ? (user?.name || 'Admin User') : ''"
        :subtitle="!rail ? user?.email : ''"
        nav
      >
        <template v-slot:prepend v-if="rail">
          <v-avatar size="32">
            <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
          </v-avatar>
        </template>
        <template v-slot:append>
          <v-btn
            variant="text"
            :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
            @click.stop="rail = !rail"
          ></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-view-dashboard"
          title="Dashboard"
          value="dashboard"
          to="/dashboard"
        ></v-list-item>
        
        <v-list-item
          prepend-icon="mdi-office-building"
          title="Organizations"
          value="organizations"
          to="/organizations"
        ></v-list-item>
        
        <v-list-item
          prepend-icon="mdi-account-group"
          title="Users"
          value="users"
          to="/users"
        ></v-list-item>
        
        <v-list-item
          prepend-icon="mdi-chart-line"
          title="Analytics"
          value="analytics"
          to="/analytics"
        ></v-list-item>
        
        <v-list-item
          prepend-icon="mdi-cog"
          title="Settings"
          value="settings"
          to="/settings"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="rail = !rail"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>{{ appName }} - Admin Console</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon="mdi-bell" variant="text"></v-btn>
      
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            color="primary"
            v-bind="props"
            variant="text"
          >
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="handleLogout">
            <v-list-item-title>
              <v-icon start>mdi-logout</v-icon>
              Logout
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const drawer = ref(true)
const rail = ref(false)

const appName = import.meta.env.VITE_APP_NAME || 'Plan Smart'
const user = computed(() => authStore.user)

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.v-navigation-drawer {
  border-right: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}
</style>