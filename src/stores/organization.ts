import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiService } from '@/services/api'

export interface Organization {
  id: string
  name: string
  slug: string
  adminEmail: string
  active: boolean
  settings?: {
    maxUsers?: number
    features?: string[]
    branding?: {
      logoUrl?: string
      primaryColor?: string
      secondaryColor?: string
    }
  }
}

export const useOrgStore = defineStore('organization', () => {
  const currentOrganization = ref<Organization | null>(null)
  const organizations = ref<Organization[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isOrgContext = computed(() => !!currentOrganization.value)
  const orgSlug = computed(() => currentOrganization.value?.slug || null)

  // Set current organization by slug (for multi-tenant routing)
  const setCurrentOrganization = async (slug: string) => {
    loading.value = true
    error.value = null
    
    try {
      // Check if already loaded
      if (currentOrganization.value?.slug === slug) {
        return currentOrganization.value
      }

      // Try to find in cached organizations first
      let org = organizations.value.find(o => o.slug === slug)
      
      if (!org) {
        // Fetch from API
        const response = await apiService.getOrganizationBySlug(slug)
        org = response.organization
        
        // Cache the organization
        if (org && !organizations.value.find(o => o.id === org.id)) {
          organizations.value.push(org)
        }
      }

      if (!org) {
        throw new Error('Organization not found')
      }

      currentOrganization.value = org
      return org
    } catch (err: any) {
      error.value = err.message || 'Failed to load organization'
      currentOrganization.value = null
      throw err
    } finally {
      loading.value = false
    }
  }

  // Clear organization context (for platform-level routes)
  const clearOrganizationContext = () => {
    currentOrganization.value = null
    error.value = null
  }

  // Load all organizations (Super Admin only)
  const loadOrganizations = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await apiService.getOrganizations()
      organizations.value = response.organizations || []
      return organizations.value
    } catch (err: any) {
      error.value = err.message || 'Failed to load organizations'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Create new organization (Super Admin only)
  const createOrganization = async (orgData: { name: string; adminEmail: string }) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await apiService.createOrganization(orgData)
      const newOrg = response.organization
      
      if (newOrg) {
        organizations.value.push(newOrg)
      }
      
      return newOrg
    } catch (err: any) {
      error.value = err.message || 'Failed to create organization'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Check if user belongs to current organization
  const validateUserAccess = (userOrgId: string) => {
    if (!currentOrganization.value) return false
    return currentOrganization.value.id === userOrgId
  }

  // Get organization-scoped API base path
  const getOrgApiPath = (endpoint: string) => {
    if (!currentOrganization.value) return endpoint
    return `/${currentOrganization.value.slug}${endpoint}`
  }

  return {
    // State
    currentOrganization,
    organizations,
    loading,
    error,
    
    // Getters
    isOrgContext,
    orgSlug,
    
    // Actions
    setCurrentOrganization,
    clearOrganizationContext,
    loadOrganizations,
    createOrganization,
    validateUserAccess,
    getOrgApiPath
  }
})