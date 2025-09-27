<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">Settings</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>
            <v-icon class="mr-2">mdi-account-cog</v-icon>
            Profile Settings
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="profile.firstName"
                label="First Name"
                prepend-icon="mdi-account"
              ></v-text-field>
              
              <v-text-field
                v-model="profile.lastName"
                label="Last Name"
                prepend-icon="mdi-account"
              ></v-text-field>
              
              <v-text-field
                v-model="profile.email"
                label="Email"
                type="email"
                prepend-icon="mdi-email"
                readonly
              ></v-text-field>
              
              <v-text-field
                v-model="profile.department"
                label="Department"
                prepend-icon="mdi-office-building"
              ></v-text-field>
              
              <v-text-field
                v-model="profile.jobTitle"
                label="Job Title"
                prepend-icon="mdi-briefcase"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              @click="saveProfile"
              :loading="saving"
              color="primary"
            >
              Save Changes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="mb-4">
          <v-card-title>
            <v-icon class="mr-2">mdi-palette</v-icon>
            Appearance
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon>mdi-theme-light-dark</v-icon>
                </template>
                <v-list-item-title>Dark Mode</v-list-item-title>
                <template v-slot:append>
                  <v-switch
                    v-model="isDarkMode"
                    @change="toggleTheme"
                    color="primary"
                  ></v-switch>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>

        <v-card>
          <v-card-title>
            <v-icon class="mr-2">mdi-security</v-icon>
            Security
          </v-card-title>
          <v-card-text>
            <v-btn
              @click="showPasswordDialog = true"
              prepend-icon="mdi-lock-reset"
              variant="outlined"
              block
            >
              Change Password
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Change Password Dialog -->
    <v-dialog v-model="showPasswordDialog" max-width="400px">
      <v-card>
        <v-card-title>Change Password</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="passwordForm.currentPassword"
              label="Current Password"
              type="password"
              prepend-icon="mdi-lock"
            ></v-text-field>
            
            <v-text-field
              v-model="passwordForm.newPassword"
              label="New Password"
              type="password"
              prepend-icon="mdi-lock-plus"
            ></v-text-field>
            
            <v-text-field
              v-model="passwordForm.confirmPassword"
              label="Confirm New Password"
              type="password"
              prepend-icon="mdi-lock-check"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="showPasswordDialog = false">Cancel</v-btn>
          <v-btn
            @click="changePassword"
            :loading="changingPassword"
            color="primary"
          >
            Change Password
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'

const authStore = useAuthStore()
const themeStore = useThemeStore()

const profile = ref({
  firstName: '',
  lastName: '',
  email: '',
  department: '',
  jobTitle: ''
})

const saving = ref(false)
const showPasswordDialog = ref(false)
const changingPassword = ref(false)

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const isDarkMode = computed({
  get: () => themeStore.isDarkMode,
  set: (value) => {
    if (value !== themeStore.isDarkMode) {
      themeStore.toggleTheme()
    }
  }
})

const toggleTheme = () => {
  themeStore.toggleTheme()
}

const saveProfile = async () => {
  saving.value = true
  try {
    // API call to save profile would go here
    console.log('Saving profile:', profile.value)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
  } catch (error) {
    console.error('Failed to save profile:', error)
  } finally {
    saving.value = false
  }
}

const changePassword = async () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    console.error('Passwords do not match')
    return
  }

  changingPassword.value = true
  try {
    // API call to change password would go here
    console.log('Changing password')
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    showPasswordDialog.value = false
    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  } catch (error) {
    console.error('Failed to change password:', error)
  } finally {
    changingPassword.value = false
  }
}

const loadProfile = async () => {
  try {
    const userProfile = await authStore.getProfile()
    if (userProfile) {
      profile.value = {
        firstName: userProfile.firstName || '',
        lastName: userProfile.lastName || '',
        email: userProfile.email || '',
        department: userProfile.department || '',
        jobTitle: userProfile.jobTitle || ''
      }
    }
  } catch (error) {
    console.error('Failed to load profile:', error)
  }
}

onMounted(loadProfile)
</script>