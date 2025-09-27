<template>
  <div>
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-space-between align-center mb-4">
          <h1 class="text-h4">Organizations</h1>
          <v-btn
            @click="showCreateDialog = true"
            prepend-icon="mdi-plus"
            color="primary"
          >
            Create Organization
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-row v-if="loading">
      <v-col cols="12">
        <v-skeleton-loader type="card"></v-skeleton-loader>
      </v-col>
    </v-row>

    <v-row v-else-if="organizations.length === 0">
      <v-col cols="12">
        <v-card>
          <v-card-text class="text-center py-8">
            <v-icon size="64" color="grey">mdi-office-building-outline</v-icon>
            <div class="text-h6 mt-2">No organizations found</div>
            <div class="text-body-2 text-medium-emphasis">
              Create your first organization to get started
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col
        v-for="org in organizations"
        :key="org.id"
        cols="12"
        md="6"
        lg="4"
      >
        <v-card hover>
          <v-card-title>
            <v-icon class="mr-2">mdi-office-building</v-icon>
            {{ org.name }}
          </v-card-title>
          
          <v-card-subtitle>{{ org.slug }}</v-card-subtitle>
          
          <v-card-text>
            <div class="mb-2">
              <strong>Admin:</strong> {{ org.adminEmail }}
            </div>
            
            <v-chip
              :color="org.active ? 'success' : 'error'"
              size="small"
            >
              {{ org.active ? 'Active' : 'Inactive' }}
            </v-chip>
          </v-card-text>
          
          <v-card-actions>
            <v-btn size="small" prepend-icon="mdi-eye">View</v-btn>
            <v-btn size="small" prepend-icon="mdi-pencil">Edit</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Create Organization Dialog -->
    <v-dialog v-model="showCreateDialog" max-width="500px">
      <v-card>
        <v-card-title>Create Organization</v-card-title>
        
        <v-card-text>
          <v-form @submit.prevent="createOrganization">
            <v-text-field
              v-model="newOrg.name"
              label="Organization Name"
              required
              :rules="nameRules"
            ></v-text-field>
            
            <v-text-field
              v-model="newOrg.adminEmail"
              label="Admin Email"
              type="email"
              required
              :rules="emailRules"
            ></v-text-field>
          </v-form>
        </v-card-text>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="showCreateDialog = false">Cancel</v-btn>
          <v-btn
            @click="createOrganization"
            :loading="creating"
            color="primary"
          >
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { apiService } from '@/services/api'

const organizations = ref<any[]>([])
const loading = ref(false)
const showCreateDialog = ref(false)
const creating = ref(false)
const newOrg = ref({ name: '', adminEmail: '' })

const nameRules = [
  (v: string) => !!v || 'Name is required'
]

const emailRules = [
  (v: string) => !!v || 'Email is required',
  (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid'
]

const loadOrganizations = async () => {
  loading.value = true
  try {
    const response = await apiService.getOrganizations()
    organizations.value = response.organizations || []
  } catch (error) {
    console.error('Failed to load organizations:', error)
  } finally {
    loading.value = false
  }
}

const createOrganization = async () => {
  if (!newOrg.value.name || !newOrg.value.adminEmail) {
    return
  }

  creating.value = true
  try {
    await apiService.createOrganization(newOrg.value)
    showCreateDialog.value = false
    newOrg.value = { name: '', adminEmail: '' }
    loadOrganizations()
  } catch (error) {
    console.error('Failed to create organization:', error)
  } finally {
    creating.value = false
  }
}

onMounted(loadOrganizations)
</script>