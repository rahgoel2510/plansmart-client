<template>
  <div class="teams-view">
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-space-between align-center mb-4">
          <div>
            <h1 class="text-h4 font-weight-bold">Teams</h1>
            <p class="text-body-1 text-medium-emphasis">
              Manage your organization's teams and members
            </p>
          </div>
          <v-btn
            @click="showCreateTeam = true"
            prepend-icon="mdi-plus"
            color="primary"
            v-if="canManageTeams"
          >
            Create Team
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-row v-if="loading">
      <v-col cols="12">
        <v-skeleton-loader type="card"></v-skeleton-loader>
      </v-col>
    </v-row>

    <v-row v-else-if="teams.length === 0">
      <v-col cols="12">
        <v-card>
          <v-card-text class="text-center py-8">
            <v-icon size="64" color="grey">mdi-account-group-outline</v-icon>
            <div class="text-h6 mt-2">No teams found</div>
            <div class="text-body-2 text-medium-emphasis">
              Create your first team to get started
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col
        v-for="team in teams"
        :key="team.id"
        cols="12"
        md="6"
        lg="4"
      >
        <v-card hover class="team-card">
          <v-card-title class="d-flex align-center">
            <v-avatar
              :color="team.color || 'primary'"
              size="40"
              class="mr-3"
            >
              <v-icon color="white">{{ team.icon || 'mdi-account-group' }}</v-icon>
            </v-avatar>
            <div>
              <div class="text-h6">{{ team.name }}</div>
              <div class="text-caption text-medium-emphasis">
                {{ team.department }}
              </div>
            </div>
          </v-card-title>
          
          <v-card-text>
            <div class="mb-3">
              <div class="text-body-2 mb-2">{{ team.description }}</div>
              
              <div class="d-flex align-center mb-2">
                <v-icon size="small" class="mr-1">mdi-account</v-icon>
                <span class="text-body-2">{{ team.memberCount }} members</span>
              </div>
              
              <div class="d-flex align-center">
                <v-icon size="small" class="mr-1">mdi-crown</v-icon>
                <span class="text-body-2">{{ team.lead }}</span>
              </div>
            </div>

            <v-chip-group>
              <v-chip
                v-for="skill in team.skills"
                :key="skill"
                size="small"
                variant="outlined"
              >
                {{ skill }}
              </v-chip>
            </v-chip-group>
          </v-card-text>
          
          <v-card-actions>
            <v-btn size="small" prepend-icon="mdi-eye">View</v-btn>
            <v-btn 
              size="small" 
              prepend-icon="mdi-pencil"
              v-if="canManageTeams"
            >
              Edit
            </v-btn>
            <v-spacer></v-spacer>
            <v-chip
              :color="team.status === 'active' ? 'success' : 'warning'"
              size="small"
            >
              {{ team.status }}
            </v-chip>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Create Team Dialog -->
    <v-dialog v-model="showCreateTeam" max-width="600px">
      <v-card>
        <v-card-title>Create New Team</v-card-title>
        
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="newTeam.name"
              label="Team Name"
              required
            ></v-text-field>
            
            <v-text-field
              v-model="newTeam.department"
              label="Department"
              required
            ></v-text-field>
            
            <v-textarea
              v-model="newTeam.description"
              label="Description"
              rows="3"
            ></v-textarea>
            
            <v-text-field
              v-model="newTeam.lead"
              label="Team Lead"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="showCreateTeam = false">Cancel</v-btn>
          <v-btn
            @click="createTeam"
            :loading="creating"
            color="primary"
          >
            Create Team
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

const teams = ref([
  {
    id: '1',
    name: 'Frontend Team',
    department: 'Engineering',
    description: 'Responsible for user interface and user experience development',
    lead: 'Alice Johnson',
    memberCount: 8,
    status: 'active',
    color: 'primary',
    icon: 'mdi-monitor',
    skills: ['React', 'Vue.js', 'TypeScript', 'CSS']
  },
  {
    id: '2',
    name: 'Backend Team',
    department: 'Engineering',
    description: 'API development and server-side infrastructure',
    lead: 'Bob Smith',
    memberCount: 6,
    status: 'active',
    color: 'secondary',
    icon: 'mdi-server',
    skills: ['Node.js', 'Python', 'AWS', 'MongoDB']
  },
  {
    id: '3',
    name: 'Product Team',
    department: 'Product',
    description: 'Product strategy and roadmap planning',
    lead: 'Carol Davis',
    memberCount: 4,
    status: 'active',
    color: 'success',
    icon: 'mdi-lightbulb',
    skills: ['Strategy', 'Analytics', 'Design', 'Research']
  }
])

const loading = ref(false)
const showCreateTeam = ref(false)
const creating = ref(false)

const newTeam = ref({
  name: '',
  department: '',
  description: '',
  lead: ''
})

const orgSlug = computed(() => route.params.orgSlug as string)
const user = computed(() => authStore.user)

const canManageTeams = computed(() => {
  const managerRoles = ['ORG_ADMIN', 'EXECUTIVE', 'ENGINEERING_MANAGER']
  return user.value && managerRoles.includes(user.value.role)
})

const createTeam = async () => {
  if (!newTeam.value.name || !newTeam.value.department || !newTeam.value.lead) {
    return
  }

  creating.value = true
  try {
    // Organization-scoped team creation
    const teamData = {
      ...newTeam.value,
      organizationId: user.value?.organizationId
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Add to local teams (in real app, refetch from API)
    teams.value.push({
      id: Date.now().toString(),
      ...teamData,
      memberCount: 0,
      status: 'active',
      color: 'primary',
      icon: 'mdi-account-group',
      skills: []
    })
    
    showCreateTeam.value = false
    newTeam.value = { name: '', department: '', description: '', lead: '' }
  } catch (error) {
    console.error('Failed to create team:', error)
  } finally {
    creating.value = false
  }
}

onMounted(() => {
  // Load organization-specific teams
  // In real app: loadTeams()
})
</script>

<style scoped>
.teams-view {
  padding: 1rem;
}

.team-card {
  height: 100%;
  transition: transform 0.2s;
}

.team-card:hover {
  transform: translateY(-2px);
}
</style>