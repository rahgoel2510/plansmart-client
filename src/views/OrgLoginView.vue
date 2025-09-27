<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="6" lg="4">
            <!-- Organization Branding -->
            <div class="text-center mb-6" v-if="organization">
              <div class="org-branding">
                <img 
                  v-if="organization.settings?.branding?.logoUrl"
                  :src="organization.settings.branding.logoUrl" 
                  :alt="organization.name"
                  height="60"
                  class="mb-2"
                >
                <h1 class="text-h4 font-weight-bold text-primary">
                  {{ organization.name }}
                </h1>
                <p class="text-body-2 text-medium-emphasis">
                  Sign in to your workspace
                </p>
              </div>
            </div>

            <!-- Loading State -->
            <div v-else-if="loadingOrg" class="text-center py-8">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
              <div class="mt-4">Loading organization...</div>
            </div>

            <!-- Login Form -->
            <v-card v-else class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>
                  <v-icon class="mr-2">mdi-login</v-icon>
                  Organization Login
                </v-toolbar-title>
              </v-toolbar>
              
              <v-card-text class="pa-6">
                <v-form @submit.prevent="handleLogin">
                  <v-text-field
                    v-model="form.email"
                    label="Email"
                    type="email"
                    prepend-icon="mdi-email"
                    required
                    :rules="emailRules"
                    :error-messages="fieldErrors.email"
                  ></v-text-field>
                  
                  <v-text-field
                    v-model="form.password"
                    label="Password"
                    type="password"
                    prepend-icon="mdi-lock"
                    required
                    :rules="passwordRules"
                    :error-messages="fieldErrors.password"
                  ></v-text-field>

                  <div class="text-center mt-4">
                    <v-btn
                      @click="handleLogin"
                      :loading="loading"
                      color="primary"
                      size="large"
                      block
                    >
                      <v-icon class="mr-2">mdi-login</v-icon>
                      Sign In to {{ orgSlug }}
                    </v-btn>
                  </div>
                </v-form>
              </v-card-text>
            </v-card>
            
            <!-- Error Alert -->
            <v-alert
              v-if="error"
              type="error"
              class="mt-4"
              closable
              @click:close="error = ''"
            >
              {{ error }}
            </v-alert>

            <!-- Platform Login Link -->
            <div class="text-center mt-6">
              <v-btn
                to="/login"
                variant="text"
                size="small"
                prepend-icon="mdi-shield-crown"
              >
                Platform Admin Login
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useOrgStore } from '@/stores/organization'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const orgStore = useOrgStore()

const form = ref({
  email: '',
  password: ''
})

const loading = ref(false)
const loadingOrg = ref(false)
const error = ref('')
const fieldErrors = ref({ email: [], password: [] })

const orgSlug = computed(() => route.params.orgSlug as string)
const organization = computed(() => orgStore.currentOrganization)

const emailRules = [
  (v: string) => !!v || 'Email is required',
  (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid'
]

const passwordRules = [
  (v: string) => !!v || 'Password is required',
  (v: string) => v.length >= 6 || 'Password must be at least 6 characters'
]

const handleLogin = async () => {
  if (!form.value.email || !form.value.password) {
    error.value = 'Please fill in all fields'
    return
  }

  loading.value = true
  error.value = ''
  fieldErrors.value = { email: [], password: [] }
  
  try {
    // Organization-scoped login
    await authStore.orgLogin(orgSlug.value, form.value)
    
    // Validate user belongs to this organization
    if (authStore.user && !orgStore.validateUserAccess(authStore.user.organizationId)) {
      throw new Error('You do not have access to this organization')
    }
    
    // Redirect to organization dashboard
    router.push(`/${orgSlug.value}/dashboard`)
  } catch (err: any) {
    error.value = err.response?.data?.error || err.message || 'Login failed'
    
    // Handle field-specific errors
    if (err.response?.data?.fieldErrors) {
      fieldErrors.value = err.response.data.fieldErrors
    }
  } finally {
    loading.value = false
  }
}

const loadOrganization = async () => {
  if (!orgSlug.value) return
  
  loadingOrg.value = true
  try {
    await orgStore.setCurrentOrganization(orgSlug.value)
  } catch (err) {
    error.value = 'Organization not found'
  } finally {
    loadingOrg.value = false
  }
}

onMounted(() => {
  // If already authenticated and belongs to this org, redirect to dashboard
  if (authStore.isAuthenticated && authStore.user) {
    if (orgStore.validateUserAccess(authStore.user.organizationId)) {
      router.push(`/${orgSlug.value}/dashboard`)
      return
    }
  }
  
  loadOrganization()
})
</script>

<style scoped>
.org-branding {
  padding: 2rem 0;
}

.v-main {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.v-card {
  border-radius: 16px;
}

.v-toolbar {
  border-radius: 16px 16px 0 0;
}
</style>