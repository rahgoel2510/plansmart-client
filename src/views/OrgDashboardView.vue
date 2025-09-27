<template>
  <div class="org-dashboard">
    <!-- Organization Header -->
    <v-row class="mb-4">
      <v-col cols="12">
        <v-card class="org-header-card">
          <v-card-text class="d-flex align-center">
            <div class="org-info flex-grow-1">
              <h1 class="text-h4 font-weight-bold text-primary">
                {{ organization?.name }} Dashboard
              </h1>
              <p class="text-body-1 text-medium-emphasis mb-0">
                Welcome back, {{ user?.firstName }}! Here's your organization overview.
              </p>
            </div>
            <div class="org-actions">
              <v-chip
                :color="organization?.active ? 'success' : 'error'"
                prepend-icon="mdi-circle"
                size="small"
              >
                {{ organization?.active ? 'Active' : 'Inactive' }}
              </v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- KPI Cards -->
    <v-row class="mb-4">
      <v-col cols="12" md="3">
        <v-card class="kpi-card">
          <v-card-text>
            <div class="d-flex align-center">
              <v-icon size="40" color="primary" class="mr-3">mdi-account-group</v-icon>
              <div>
                <div class="text-h4 font-weight-bold">{{ kpis.totalUsers }}</div>
                <div class="text-body-2 text-medium-emphasis">Team Members</div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="kpi-card">
          <v-card-text>
            <div class="d-flex align-center">
              <v-icon size="40" color="secondary" class="mr-3">mdi-folder-multiple</v-icon>
              <div>
                <div class="text-h4 font-weight-bold">{{ kpis.activeProjects }}</div>
                <div class="text-body-2 text-medium-emphasis">Active Projects</div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="kpi-card">
          <v-card-text>
            <div class="d-flex align-center">
              <v-icon size="40" color="success" class="mr-3">mdi-check-circle</v-icon>
              <div>
                <div class="text-h4 font-weight-bold">{{ kpis.completedTasks }}</div>
                <div class="text-body-2 text-medium-emphasis">Completed Tasks</div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="kpi-card">
          <v-card-text>
            <div class="d-flex align-center">
              <v-icon size="40" color="warning" class="mr-3">mdi-clock-outline</v-icon>
              <div>
                <div class="text-h4 font-weight-bold">{{ kpis.pendingTasks }}</div>
                <div class="text-body-2 text-medium-emphasis">Pending Tasks</div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Quick Actions -->
    <v-row class="mb-4">
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <v-icon class="mr-2">mdi-lightning-bolt</v-icon>
            Quick Actions
          </v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap gap-2">
              <v-btn
                :to="`/${orgSlug}/teams`"
                prepend-icon="mdi-account-group"
                color="primary"
              >
                Manage Teams
              </v-btn>
              
              <v-btn
                :to="`/${orgSlug}/projects`"
                prepend-icon="mdi-folder-multiple"
                color="secondary"
              >
                View Projects
              </v-btn>
              
              <v-btn
                :to="`/${orgSlug}/analytics`"
                prepend-icon="mdi-chart-line"
                color="info"
                v-if="canViewAnalytics"
              >
                Analytics
              </v-btn>
              
              <v-btn
                :to="`/${orgSlug}/settings`"
                prepend-icon="mdi-cog"
                color="warning"
                v-if="isOrgAdmin"
              >
                Settings
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Recent Activity -->
    <v-row>
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>
            <v-icon class="mr-2">mdi-history</v-icon>
            Recent Activity
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="activity in recentActivity"
                :key="activity.id"
                :prepend-icon="activity.icon"
              >
                <v-list-item-title>{{ activity.title }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ activity.user }} • {{ activity.time }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>
            <v-icon class="mr-2">mdi-account-circle</v-icon>
            Your Profile
          </v-card-title>
          <v-card-text>
            <div class="text-center">
              <v-avatar size="80" color="primary" class="mb-3">
                <span class="text-h4">{{ userInitials }}</span>
              </v-avatar>
              <div class="text-h6">{{ user?.firstName }} {{ user?.lastName }}</div>
              <div class="text-body-2 text-medium-emphasis">{{ user?.jobTitle }}</div>
              <div class="text-body-2 text-medium-emphasis">{{ user?.department }}</div>
              
              <v-chip
                :color="getRoleColor(user?.role)"
                size="small"
                class="mt-2"
              >
                {{ user?.role?.replace('_', ' ') }}
              </v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useOrgStore } from '@/stores/organization'

const route = useRoute()
const authStore = useAuthStore()
const orgStore = useOrgStore()

const kpis = ref({
  totalUsers: 0,
  activeProjects: 0,
  completedTasks: 0,
  pendingTasks: 0
})

const recentActivity = ref([
  { id: 1, title: 'Project Alpha milestone completed', user: 'John Doe', time: '2 hours ago', icon: 'mdi-check-circle' },
  { id: 2, title: 'New team member added', user: 'Jane Smith', time: '4 hours ago', icon: 'mdi-account-plus' },
  { id: 3, title: 'Sprint planning session scheduled', user: 'Mike Johnson', time: '1 day ago', icon: 'mdi-calendar' },
  { id: 4, title: 'Budget review completed', user: 'Sarah Wilson', time: '2 days ago', icon: 'mdi-currency-usd' }
])

const loadingOrg = ref(false)

const orgSlug = computed(() => route.params.orgSlug as string)
const organization = computed(() => orgStore.currentOrganization)
const user = computed(() => authStore.user)

const userInitials = computed(() => {
  if (!user.value) return 'U'
  const first = user.value.firstName?.charAt(0) || ''
  const last = user.value.lastName?.charAt(0) || ''
  return (first + last).toUpperCase() || 'U'
})

const isOrgAdmin = computed(() => {
  return user.value?.role === 'ORG_ADMIN'
})

const canViewAnalytics = computed(() => {
  const analyticsRoles = ['ORG_ADMIN', 'EXECUTIVE', 'ENGINEERING_MANAGER', 'PRODUCT_MANAGER']
  return user.value && analyticsRoles.includes(user.value.role)
})

const getRoleColor = (role: string) => {
  const roleColors: Record<string, string> = {
    'ORG_ADMIN': 'error',
    'EXECUTIVE': 'purple',
    'ENGINEERING_MANAGER': 'primary',
    'PRODUCT_MANAGER': 'secondary',
    'TPM': 'info',
    'ORG_USER': 'success'
  }
  return roleColors[role] || 'grey'
}

const loadKPIs = async () => {
  try {
    // Organization-scoped analytics
    const analytics = await authStore.getOrgAnalytics(orgSlug.value)
    kpis.value = {
      totalUsers: analytics.users || 0,
      activeProjects: analytics.projects || 0,
      completedTasks: analytics.completedTasks || 0,
      pendingTasks: analytics.pendingTasks || 0
    }
  } catch (error) {
    console.error('Failed to load KPIs:', error)
  }
}

onMounted(() => {
  loadKPIs()
})
</script>

<style scoped>
.org-dashboard {
  padding: 1rem;
}

.org-header-card {
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-secondary)) 100%);
  color: white;
}

.org-header-card .v-card-text {
  color: white;
}

.kpi-card {
  height: 100%;
  transition: transform 0.2s;
}

.kpi-card:hover {
  transform: translateY(-2px);
}

.org-branding {
  padding: 1rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
}
</style>