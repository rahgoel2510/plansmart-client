<template>
  <AdminLayout>
    <div class="animated-dashboard">
      <v-container fluid class="pa-6">
        <!-- Animated Header -->
        <v-row class="mb-8">
          <v-col cols="12">
            <div class="header-section fade-in">
              <div class="d-flex justify-space-between align-center">
                <div>
                  <h1 class="dashboard-title">Organization Management Hub</h1>
                  <p class="dashboard-subtitle">
                    Multi-tenant platform overview & insights
                  </p>
                </div>
                <div class="live-indicators">
                  <div class="indicator-item">
                    <div class="pulse-dot success"></div>
                    <span>{{ liveStats.activeOrgs }} Organizations</span>
                  </div>
                  <div class="indicator-item">
                    <div class="pulse-dot info"></div>
                    <span>{{ liveStats.totalUsers }} Users</span>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>

        <!-- Animated KPI Cards -->
        <v-row class="mb-8">
          <v-col cols="12" sm="6" lg="3" v-for="(kpi, index) in kpis" :key="kpi.title">
            <div class="kpi-wrapper" :style="{ animationDelay: `${index * 0.1}s` }">
              <v-card class="kpi-card animated-card" elevation="0">
                <v-card-text>
                  <div class="kpi-content">
                    <div class="kpi-icon-wrapper">
                      <div class="kpi-icon" :class="kpi.color">
                        <v-icon :icon="kpi.icon" size="28"></v-icon>
                      </div>
                      <div class="icon-glow" :class="kpi.color"></div>
                    </div>
                    <div class="kpi-data">
                      <div class="kpi-value-container">
                        <span class="kpi-value animated-number">{{ kpi.value }}</span>
                        <div class="trend-indicator" :class="kpi.trend">
                          <v-icon :icon="kpi.changeIcon" size="14"></v-icon>
                          <span>{{ kpi.change }}</span>
                        </div>
                      </div>
                      <p class="kpi-title">{{ kpi.title }}</p>
                    </div>
                  </div>
                  <div class="progress-bar">
                    <div class="progress-fill" :class="kpi.color" :style="{ width: kpi.progress + '%' }"></div>
                  </div>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>

        <!-- Organization Analytics Grid -->
        <v-row>
          <!-- Organization Distribution -->
          <v-col cols="12" lg="8">
            <v-card class="main-card slide-up" elevation="0">
              <v-card-title class="card-header">
                <div class="d-flex align-center">
                  <div class="header-icon">
                    <v-icon>mdi-office-building-outline</v-icon>
                  </div>
                  <span>Organization Distribution</span>
                </div>
                <v-btn size="small" variant="text" to="/organizations">Manage All</v-btn>
              </v-card-title>
              <v-card-text>
                <div class="org-grid">
                  <div class="org-summary-cards">
                    <div class="summary-card" v-for="(summary, index) in orgSummary" :key="summary.type" 
                         :style="{ animationDelay: `${index * 0.15}s` }">
                      <div class="summary-header">
                        <div class="summary-icon" :class="summary.color">
                          <v-icon :icon="summary.icon" size="20"></v-icon>
                        </div>
                        <div class="summary-data">
                          <h3>{{ summary.count }}</h3>
                          <p>{{ summary.type }}</p>
                        </div>
                      </div>
                      <div class="summary-progress">
                        <div class="progress-track">
                          <div class="progress-bar-fill" :class="summary.color" 
                               :style="{ width: summary.percentage + '%' }"></div>
                        </div>
                        <span class="percentage">{{ summary.percentage }}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Headcount Breakdown -->
          <v-col cols="12" lg="4">
            <v-card class="main-card slide-up" elevation="0" style="animation-delay: 0.2s">
              <v-card-title class="card-header">
                <div class="d-flex align-center">
                  <div class="header-icon">
                    <v-icon>mdi-account-details</v-icon>
                  </div>
                  <span>Headcount by Role</span>
                </div>
              </v-card-title>
              <v-card-text>
                <div class="headcount-container">
                  <div class="headcount-item" v-for="role in headcountBreakdown" :key="role.role">
                    <div class="role-header">
                      <div class="role-icon" :class="role.color">
                        <v-icon :icon="role.icon" size="20"></v-icon>
                      </div>
                      <div class="role-data">
                        <h4>{{ role.count }}</h4>
                        <p>{{ role.role }}</p>
                      </div>
                    </div>
                    <div class="role-progress">
                      <div class="progress-track">
                        <div class="progress-bar-fill" :class="role.color" 
                             :style="{ width: role.percentage + '%' }"></div>
                      </div>
                      <span class="percentage">{{ role.percentage }}%</span>
                    </div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Organization Performance Matrix -->
        <v-row class="mt-6">
          <v-col cols="12">
            <v-card class="main-card slide-up" elevation="0" style="animation-delay: 0.3s">
              <v-card-title class="card-header">
                <div class="d-flex align-center">
                  <div class="header-icon">
                    <v-icon>mdi-chart-box-outline</v-icon>
                  </div>
                  <span>Organization Performance Matrix</span>
                </div>
              </v-card-title>
              <v-card-text>
                <div class="performance-grid">
                  <div class="performance-item" v-for="(org, index) in topOrganizations" :key="org.name"
                       :style="{ animationDelay: `${index * 0.1}s` }">
                    <div class="org-card">
                      <div class="org-header">
                        <div class="org-avatar" :class="org.tier">
                          {{ org.name.charAt(0) }}
                        </div>
                        <div class="org-info">
                          <h4>{{ org.name }}</h4>
                          <p>{{ org.plan }} Plan</p>
                        </div>
                        <div class="org-status">
                          <v-chip :color="getStatusColor(org.status)" size="small">
                            {{ org.status }}
                          </v-chip>
                        </div>
                      </div>
                      <div class="org-metrics">
                        <div class="metric-row">
                          <div class="metric">
                            <span class="metric-label">Projects</span>
                            <span class="metric-number">{{ org.projects }}</span>
                          </div>
                          <div class="metric">
                            <span class="metric-label">Products</span>
                            <span class="metric-number">{{ org.products }}</span>
                          </div>
                        </div>
                        <div class="metric-row">
                          <div class="metric">
                            <span class="metric-label">Revenue</span>
                            <span class="metric-number revenue">{{ org.revenue }}</span>
                          </div>
                          <div class="metric">
                            <span class="metric-label">ROI</span>
                            <span class="metric-number roi">{{ org.roi }}</span>
                          </div>
                        </div>
                        <div class="metric-row">
                          <div class="metric">
                            <span class="metric-label">Cost Savings</span>
                            <span class="metric-number savings">{{ org.costSavings }}</span>
                          </div>
                          <div class="metric">
                            <span class="metric-label">Headcount</span>
                            <span class="metric-number">{{ org.headcount }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AdminLayout from '@/layouts/AdminLayout.vue'

const router = useRouter()
const authStore = useAuthStore()

const liveStats = ref({
  activeOrgs: 127,
  totalUsers: 12847
})

const kpis = ref([
  {
    title: 'Organizations',
    value: '127',
    icon: 'mdi-office-building',
    color: 'primary',
    change: '+12 this month',
    changeIcon: 'mdi-trending-up',
    trend: 'up',
    progress: 85
  },
  {
    title: 'Active Projects',
    value: '342',
    icon: 'mdi-folder-multiple',
    color: 'success',
    change: '+28 this quarter',
    changeIcon: 'mdi-trending-up',
    trend: 'up',
    progress: 78
  },
  {
    title: 'Revenue Generated',
    value: '$24.7M',
    icon: 'mdi-currency-usd',
    color: 'warning',
    change: '+18% ROI',
    changeIcon: 'mdi-trending-up',
    trend: 'up',
    progress: 92
  },
  {
    title: 'Total Headcount',
    value: '1,247',
    icon: 'mdi-account-group',
    color: 'info',
    change: '+89 this quarter',
    changeIcon: 'mdi-trending-up',
    trend: 'up',
    progress: 68
  }
])

const orgSummary = ref([
  {
    type: 'Enterprise',
    count: 45,
    percentage: 35,
    color: 'primary',
    icon: 'mdi-crown'
  },
  {
    type: 'Professional',
    count: 62,
    percentage: 49,
    color: 'success',
    icon: 'mdi-briefcase'
  },
  {
    type: 'Starter',
    count: 20,
    percentage: 16,
    color: 'info',
    icon: 'mdi-rocket'
  }
])

const headcountBreakdown = ref([
  {
    role: 'Software Engineers',
    count: 847,
    percentage: 68,
    color: 'primary',
    icon: 'mdi-code-tags'
  },
  {
    role: 'Engineering Managers',
    count: 89,
    percentage: 7,
    color: 'success',
    icon: 'mdi-account-tie'
  },
  {
    role: 'Product Managers',
    count: 156,
    percentage: 12,
    color: 'warning',
    icon: 'mdi-lightbulb'
  },
  {
    role: 'Technical Program Managers',
    count: 155,
    percentage: 13,
    color: 'info',
    icon: 'mdi-clipboard-list'
  }
])

const topOrganizations = ref([
  { 
    name: 'Acme Corp', 
    projects: 45, 
    products: 12, 
    revenue: '$8.2M', 
    costSavings: '$2.1M', 
    headcount: 245, 
    roi: '24%',
    tier: 'enterprise' 
  },
  { 
    name: 'TechStart Inc', 
    projects: 28, 
    products: 8, 
    revenue: '$4.7M', 
    costSavings: '$890K', 
    headcount: 156, 
    roi: '18%',
    tier: 'professional' 
  },
  { 
    name: 'Global Solutions', 
    projects: 67, 
    products: 18, 
    revenue: '$12.4M', 
    costSavings: '$3.2M', 
    headcount: 389, 
    roi: '31%',
    tier: 'enterprise' 
  },
  { 
    name: 'Innovation Labs', 
    projects: 15, 
    products: 4, 
    revenue: '$1.8M', 
    costSavings: '$450K', 
    headcount: 67, 
    roi: '15%',
    tier: 'starter' 
  },
  { 
    name: 'Digital Dynamics', 
    projects: 38, 
    products: 9, 
    revenue: '$6.1M', 
    costSavings: '$1.4M', 
    headcount: 198, 
    roi: '22%',
    tier: 'professional' 
  },
  { 
    name: 'Future Systems', 
    projects: 52, 
    products: 14, 
    revenue: '$9.8M', 
    costSavings: '$2.7M', 
    headcount: 312, 
    roi: '28%',
    tier: 'enterprise' 
  }
])

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active': return 'success'
    case 'Warning': return 'warning'
    case 'Inactive': return 'error'
    default: return 'grey'
  }
}

const getUsageClass = (usage: number) => {
  if (usage > 80) return 'high'
  if (usage > 60) return 'medium'
  return 'low'
}

onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push('/login')
    return
  }
})
</script>

<style scoped>
/* Animation Keyframes */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.3); }
  50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.6); }
}

@keyframes countUp {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* Dashboard Layout */
.animated-dashboard {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  min-height: 100vh;
}

.fade-in {
  animation: fadeIn 0.8s ease-out;
}

.slide-up {
  animation: slideUp 0.6s ease-out;
}

/* Header Styling */
.header-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  border-radius: 20px;
  color: white;
  margin-bottom: 1rem;
}

.dashboard-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: linear-gradient(45deg, #ffffff, #e2e8f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.dashboard-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
}

.live-indicators {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.indicator-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.pulse-dot.success { background: #10b981; }
.pulse-dot.info { background: #3b82f6; }

/* KPI Cards */
.kpi-wrapper {
  animation: slideUp 0.6s ease-out;
}

.kpi-card {
  background: white;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  overflow: hidden;
  position: relative;
}

.animated-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
}

.kpi-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.kpi-icon-wrapper {
  position: relative;
}

.kpi-icon {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
  z-index: 2;
}

.kpi-icon.primary { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.kpi-icon.success { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
.kpi-icon.info { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }
.kpi-icon.warning { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); }

.icon-glow {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: 18px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.kpi-card:hover .icon-glow {
  opacity: 1;
  animation: glow 2s infinite;
}

.icon-glow.primary { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.icon-glow.success { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
.icon-glow.info { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }
.icon-glow.warning { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); }

.kpi-data {
  flex: 1;
}

.kpi-value-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.kpi-value {
  font-size: 2.25rem;
  font-weight: 800;
  color: #1a202c;
  animation: countUp 0.8s ease-out;
}

.trend-indicator {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.trend-indicator.up {
  background: rgba(16, 185, 129, 0.1);
  color: #059669;
}

.kpi-title {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
}

.progress-bar {
  height: 4px;
  background: #f1f5f9;
  border-radius: 2px;
  overflow: hidden;
  margin-top: 1rem;
}

.progress-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.progress-fill.primary { background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); }
.progress-fill.success { background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%); }
.progress-fill.info { background: linear-gradient(90deg, #43e97b 0%, #38f9d7 100%); }
.progress-fill.warning { background: linear-gradient(90deg, #fa709a 0%, #fee140 100%); }

/* Main Cards */
.main-card {
  background: white;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.main-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.card-header {
  padding: 1.5rem 1.5rem 0;
  font-weight: 600;
  color: #1a202c;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-right: 0.75rem;
}

/* Organization Summary Cards */
.org-summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

.summary-card {
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  animation: slideUp 0.6s ease-out;
}

.summary-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.summary-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.summary-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.summary-icon.primary { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.summary-icon.success { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
.summary-icon.info { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }

.summary-data h3 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 0.25rem;
}

.summary-data p {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
}

.summary-progress {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.progress-track {
  flex: 1;
  height: 6px;
  background: #f1f5f9;
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.progress-bar-fill.primary { background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); }
.progress-bar-fill.success { background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%); }
.progress-bar-fill.info { background: linear-gradient(90deg, #43e97b 0%, #38f9d7 100%); }

.percentage {
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
}

/* Organization Insights */
.insights-container {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.insight-item {
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.25rem;
  transition: all 0.3s ease;
}

.insight-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  border-color: #c7d2fe;
}

.insight-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.insight-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.insight-icon.primary { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.insight-icon.success { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
.insight-icon.warning { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); }
.insight-icon.info { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }

.insight-data h4 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 0.25rem;
}

.insight-data p {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
  font-weight: 500;
}

.insight-trend {
  display: flex;
  justify-content: flex-end;
}

/* Organization Insights Responsive */
@media (max-width: 1024px) {
  .insights-container {
    gap: 1rem;
  }
  
  .insight-item {
    padding: 1rem;
  }
  
  .insight-header {
    gap: 0.75rem;
  }
  
  .insight-icon {
    width: 36px;
    height: 36px;
  }
  
  .insight-data h4 {
    font-size: 1.25rem;
  }
}

/* Performance Grid */
.performance-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

.performance-item {
  animation: slideUp 0.6s ease-out;
}

.org-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.org-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  border-color: #c7d2fe;
}

.org-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.org-avatar {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.25rem;
  color: white;
}

.org-avatar.enterprise { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.org-avatar.professional { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
.org-avatar.starter { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }

.org-info h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 0.25rem;
}

.org-info p {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
}

.org-metrics {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.metric-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.metric {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.75rem;
  background: #f8fafc;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.metric:hover {
  background: #f1f5f9;
  transform: translateY(-1px);
}

.metric-label {
  font-size: 0.7rem;
  color: #64748b;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.metric-number {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a202c;
}

.metric-number.revenue {
  color: #059669;
}

.metric-number.roi {
  color: #0ea5e9;
}

.metric-number.savings {
  color: #dc2626;
}

/* Headcount Container */
.headcount-container {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.headcount-item {
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.25rem;
  transition: all 0.3s ease;
}

.headcount-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  border-color: #c7d2fe;
}

.role-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.role-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.role-icon.primary { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.role-icon.success { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
.role-icon.warning { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); }
.role-icon.info { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }

.role-data h4 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 0.25rem;
}

.role-data p {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
  font-weight: 500;
}

.role-progress {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .dashboard-title {
    font-size: 1.75rem;
  }
  
  .live-indicators {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .kpi-content {
    flex-direction: column;
    text-align: center;
  }
  
  .metric-row {
    grid-template-columns: 1fr;
  }
  
  .headcount-container {
    gap: 1rem;
  }
  
  .headcount-item {
    padding: 1rem;
  }
}
</style>