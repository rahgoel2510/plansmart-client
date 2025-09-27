<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">Analytics Dashboard</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6" lg="3">
        <v-card>
          <v-card-title>
            <v-icon class="mr-2">mdi-chart-line</v-icon>
            Total Users
          </v-card-title>
          <v-card-text>
            <div class="text-h3 text-primary">{{ metrics.totalUsers }}</div>
            <div class="text-caption text-success">
              <v-icon size="small">mdi-trending-up</v-icon>
              +12% from last month
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" lg="3">
        <v-card>
          <v-card-title>
            <v-icon class="mr-2">mdi-office-building</v-icon>
            Organizations
          </v-card-title>
          <v-card-text>
            <div class="text-h3 text-secondary">{{ metrics.totalOrganizations }}</div>
            <div class="text-caption text-success">
              <v-icon size="small">mdi-trending-up</v-icon>
              +5% from last month
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" lg="3">
        <v-card>
          <v-card-title>
            <v-icon class="mr-2">mdi-api</v-icon>
            API Requests
          </v-card-title>
          <v-card-text>
            <div class="text-h3 text-info">{{ metrics.apiRequests }}</div>
            <div class="text-caption text-success">
              <v-icon size="small">mdi-trending-up</v-icon>
              +25% from last month
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" lg="3">
        <v-card>
          <v-card-title>
            <v-icon class="mr-2">mdi-clock-outline</v-icon>
            Uptime
          </v-card-title>
          <v-card-text>
            <div class="text-h3 text-success">{{ metrics.uptime }}%</div>
            <div class="text-caption text-medium-emphasis">
              Last 30 days
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>Usage Trends</v-card-title>
          <v-card-text>
            <div class="text-center py-8">
              <v-icon size="64" color="grey">mdi-chart-areaspline</v-icon>
              <div class="text-h6 mt-2">Chart Integration</div>
              <div class="text-body-2 text-medium-emphasis">
                Chart.js integration ready for implementation
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Recent Activity</v-card-title>
          <v-card-text>
            <v-list density="compact">
              <v-list-item
                v-for="activity in recentActivity"
                :key="activity.id"
                :prepend-icon="activity.icon"
              >
                <v-list-item-title>{{ activity.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ activity.time }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { apiService } from '@/services/api'

const metrics = ref({
  totalUsers: 0,
  totalOrganizations: 0,
  apiRequests: 0,
  uptime: 99.9
})

const recentActivity = ref([
  { id: 1, title: 'New user registered', time: '2 minutes ago', icon: 'mdi-account-plus' },
  { id: 2, title: 'Organization created', time: '15 minutes ago', icon: 'mdi-office-building' },
  { id: 3, title: 'API endpoint accessed', time: '1 hour ago', icon: 'mdi-api' },
  { id: 4, title: 'System backup completed', time: '2 hours ago', icon: 'mdi-backup-restore' }
])

const loadMetrics = async () => {
  try {
    const analytics = await apiService.getAnalytics()
    metrics.value.totalUsers = analytics.metrics?.total_users || 0
    metrics.value.totalOrganizations = analytics.metrics?.total_organizations || 0
    metrics.value.apiRequests = analytics.metrics?.api_requests_today || 0
  } catch (error) {
    console.error('Failed to load analytics:', error)
  }
}

onMounted(loadMetrics)
</script>