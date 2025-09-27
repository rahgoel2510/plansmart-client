<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="6" lg="4">
            <v-card class="elevation-12 text-center">
              <v-card-text class="pa-8">
                <v-icon size="64" color="error" class="mb-4">
                  mdi-alert-circle-outline
                </v-icon>
                
                <h1 class="text-h4 font-weight-bold mb-4">
                  {{ errorTitle }}
                </h1>
                
                <p class="text-body-1 text-medium-emphasis mb-6">
                  {{ errorMessage }}
                </p>
                
                <div class="d-flex flex-column gap-3">
                  <v-btn
                    @click="goBack"
                    color="primary"
                    size="large"
                    prepend-icon="mdi-arrow-left"
                  >
                    Go Back
                  </v-btn>
                  
                  <v-btn
                    @click="goHome"
                    variant="outlined"
                    size="large"
                    prepend-icon="mdi-home"
                  >
                    Go Home
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const errorTitle = computed(() => {
  const error = route.query.error as string
  switch (error) {
    case 'not-found':
      return 'Page Not Found'
    case 'unauthorized':
      return 'Access Denied'
    case 'org-not-found':
      return 'Organization Not Found'
    default:
      return 'Something Went Wrong'
  }
})

const errorMessage = computed(() => {
  const error = route.query.error as string
  switch (error) {
    case 'not-found':
      return 'The page you are looking for does not exist.'
    case 'unauthorized':
      return 'You do not have permission to access this resource.'
    case 'org-not-found':
      return 'The organization you are trying to access could not be found.'
    default:
      return 'An unexpected error occurred. Please try again later.'
  }
})

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    goHome()
  }
}

const goHome = () => {
  const orgSlug = route.params.orgSlug as string
  if (orgSlug) {
    router.push(`/${orgSlug}/login`)
  } else {
    router.push('/login')
  }
}
</script>

<style scoped>
.v-main {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.gap-3 {
  gap: 12px;
}
</style>