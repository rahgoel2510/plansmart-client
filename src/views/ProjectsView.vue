<template>
  <div class="projects-view">
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-space-between align-center mb-4">
          <div>
            <h1 class="text-h4 font-weight-bold">Projects</h1>
            <p class="text-body-1 text-medium-emphasis">
              Track and manage your organization's projects
            </p>
          </div>
          <v-btn
            @click="showCreateProject = true"
            prepend-icon="mdi-plus"
            color="primary"
            v-if="canManageProjects"
          >
            New Project
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <!-- Project Filters -->
    <v-row class="mb-4">
      <v-col cols="12" md="4">
        <v-select
          v-model="filters.status"
          :items="statusOptions"
          label="Filter by Status"
          prepend-icon="mdi-filter"
          clearable
        ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="filters.priority"
          :items="priorityOptions"
          label="Filter by Priority"
          prepend-icon="mdi-flag"
          clearable
        ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="filters.search"
          label="Search projects"
          prepend-icon="mdi-magnify"
          clearable
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row v-if="loading">
      <v-col cols="12">
        <v-skeleton-loader type="card"></v-skeleton-loader>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col
        v-for="project in filteredProjects"
        :key="project.id"
        cols="12"
        md="6"
        lg="4"
      >
        <v-card hover class="project-card">
          <v-card-title class="d-flex align-center">
            <v-icon 
              :color="getPriorityColor(project.priority)" 
              class="mr-2"
            >
              {{ getPriorityIcon(project.priority) }}
            </v-icon>
            <div class="flex-grow-1">
              <div class="text-h6">{{ project.name }}</div>
              <div class="text-caption text-medium-emphasis">
                {{ project.code }}
              </div>
            </div>
            <v-chip
              :color="getStatusColor(project.status)"
              size="small"
            >
              {{ project.status }}
            </v-chip>
          </v-card-title>
          
          <v-card-text>
            <div class="mb-3">
              <p class="text-body-2">{{ project.description }}</p>
            </div>

            <div class="project-meta">
              <div class="d-flex align-center mb-2">
                <v-icon size="small" class="mr-2">mdi-account</v-icon>
                <span class="text-body-2">{{ project.owner }}</span>
              </div>
              
              <div class="d-flex align-center mb-2">
                <v-icon size="small" class="mr-2">mdi-calendar</v-icon>
                <span class="text-body-2">Due: {{ formatDate(project.dueDate) }}</span>
              </div>
              
              <div class="d-flex align-center mb-3">
                <v-icon size="small" class="mr-2">mdi-currency-usd</v-icon>
                <span class="text-body-2">Budget: ${{ project.budget.toLocaleString() }}</span>
              </div>

              <v-progress-linear
                :model-value="project.progress"
                :color="getProgressColor(project.progress)"
                height="8"
                rounded
              ></v-progress-linear>
              <div class="text-caption text-center mt-1">
                {{ project.progress }}% Complete
              </div>
            </div>
          </v-card-text>
          
          <v-card-actions>
            <v-btn size="small" prepend-icon="mdi-eye">View</v-btn>
            <v-btn 
              size="small" 
              prepend-icon="mdi-pencil"
              v-if="canManageProjects"
            >
              Edit
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              size="small"
              :prepend-icon="project.starred ? 'mdi-star' : 'mdi-star-outline'"
              :color="project.starred ? 'warning' : 'grey'"
              @click="toggleStar(project)"
            >
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Create Project Dialog -->
    <v-dialog v-model="showCreateProject" max-width="700px">
      <v-card>
        <v-card-title>Create New Project</v-card-title>
        
        <v-card-text>
          <v-form>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="newProject.name"
                  label="Project Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="newProject.code"
                  label="Project Code"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            
            <v-textarea
              v-model="newProject.description"
              label="Description"
              rows="3"
            ></v-textarea>
            
            <v-row>
              <v-col cols="12" md="6">
                <v-select
                  v-model="newProject.priority"
                  :items="priorityOptions"
                  label="Priority"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="newProject.owner"
                  label="Project Owner"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="newProject.budget"
                  label="Budget"
                  type="number"
                  prefix="$"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="newProject.dueDate"
                  label="Due Date"
                  type="date"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="showCreateProject = false">Cancel</v-btn>
          <v-btn
            @click="createProject"
            :loading="creating"
            color="primary"
          >
            Create Project
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const authStore = useAuthStore()

const projects = ref([
  {
    id: '1',
    name: 'Mobile App Redesign',
    code: 'MAR-2024',
    description: 'Complete redesign of the mobile application with new UI/UX',
    priority: 'High',
    status: 'In Progress',
    owner: 'Alice Johnson',
    budget: 150000,
    dueDate: '2024-12-31',
    progress: 65,
    starred: true
  },
  {
    id: '2',
    name: 'API Integration',
    code: 'API-2024',
    description: 'Integration with third-party APIs for enhanced functionality',
    priority: 'Medium',
    status: 'Planning',
    owner: 'Bob Smith',
    budget: 75000,
    dueDate: '2024-11-15',
    progress: 25,
    starred: false
  },
  {
    id: '3',
    name: 'Security Audit',
    code: 'SEC-2024',
    description: 'Comprehensive security audit and vulnerability assessment',
    priority: 'High',
    status: 'Completed',
    owner: 'Carol Davis',
    budget: 50000,
    dueDate: '2024-10-01',
    progress: 100,
    starred: false
  }
])

const loading = ref(false)
const showCreateProject = ref(false)
const creating = ref(false)

const filters = ref({
  status: null,
  priority: null,
  search: ''
})

const newProject = ref({
  name: '',
  code: '',
  description: '',
  priority: 'Medium',
  owner: '',
  budget: 0,
  dueDate: ''
})

const statusOptions = ['Planning', 'In Progress', 'On Hold', 'Completed', 'Cancelled']
const priorityOptions = ['Low', 'Medium', 'High', 'Critical']

const orgSlug = computed(() => route.params.orgSlug as string)
const user = computed(() => authStore.user)

const canManageProjects = computed(() => {
  const managerRoles = ['ORG_ADMIN', 'EXECUTIVE', 'PRODUCT_MANAGER', 'ENGINEERING_MANAGER']
  return user.value && managerRoles.includes(user.value.role)
})

const filteredProjects = computed(() => {
  let filtered = projects.value

  if (filters.value.status) {
    filtered = filtered.filter(p => p.status === filters.value.status)
  }

  if (filters.value.priority) {
    filtered = filtered.filter(p => p.priority === filters.value.priority)
  }

  if (filters.value.search) {
    const search = filters.value.search.toLowerCase()
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(search) ||
      p.code.toLowerCase().includes(search) ||
      p.description.toLowerCase().includes(search)
    )
  }

  return filtered
})

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    'Planning': 'info',
    'In Progress': 'primary',
    'On Hold': 'warning',
    'Completed': 'success',
    'Cancelled': 'error'
  }
  return colors[status] || 'grey'
}

const getPriorityColor = (priority: string) => {
  const colors: Record<string, string> = {
    'Low': 'success',
    'Medium': 'warning',
    'High': 'error',
    'Critical': 'purple'
  }
  return colors[priority] || 'grey'
}

const getPriorityIcon = (priority: string) => {
  const icons: Record<string, string> = {
    'Low': 'mdi-flag-outline',
    'Medium': 'mdi-flag',
    'High': 'mdi-flag',
    'Critical': 'mdi-fire'
  }
  return icons[priority] || 'mdi-flag-outline'
}

const getProgressColor = (progress: number) => {
  if (progress >= 80) return 'success'
  if (progress >= 50) return 'primary'
  if (progress >= 25) return 'warning'
  return 'error'
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const toggleStar = (project: any) => {
  project.starred = !project.starred
}

const createProject = async () => {
  if (!newProject.value.name || !newProject.value.code || !newProject.value.owner) {
    return
  }

  creating.value = true
  try {
    // Organization-scoped project creation
    const projectData = {
      ...newProject.value,
      organizationId: user.value?.organizationId,
      status: 'Planning',
      progress: 0,
      starred: false
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    projects.value.push({
      id: Date.now().toString(),
      ...projectData
    })
    
    showCreateProject.value = false
    newProject.value = {
      name: '',
      code: '',
      description: '',
      priority: 'Medium',
      owner: '',
      budget: 0,
      dueDate: ''
    }
  } catch (error) {
    console.error('Failed to create project:', error)
  } finally {
    creating.value = false
  }
}

onMounted(() => {
  // Load organization-specific projects
  // In real app: loadProjects()
})
</script>

<style scoped>
.projects-view {
  padding: 1rem;
}

.project-card {
  height: 100%;
  transition: transform 0.2s;
}

.project-card:hover {
  transform: translateY(-2px);
}

.project-meta {
  border-top: 1px solid rgba(var(--v-theme-outline), 0.12);
  padding-top: 1rem;
}
</style>