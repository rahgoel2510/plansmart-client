import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService, type LoginCredentials, type User } from '@/services/authService'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const user = ref<User | null>(null)
  const loading = ref(false)

  const isAuthenticated = computed(() => !!token.value)

  const login = async (credentials: LoginCredentials) => {
    loading.value = true
    try {
      // Mock login for testing
      const mockResponse = {
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: '1',
          email: credentials.email,
          name: 'Test Admin',
          role: 'admin'
        }
      }
      
      token.value = mockResponse.token
      user.value = mockResponse.user
      localStorage.setItem('token', mockResponse.token)
      localStorage.setItem('user', JSON.stringify(mockResponse.user))
      return mockResponse
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  const orgLogin = async (orgSlug: string, credentials: LoginCredentials) => {
    loading.value = true
    try {
      const response = await authService.orgLogin(orgSlug, credentials)
      token.value = response.token
      user.value = response.user
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      return response
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      token.value = null
      user.value = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }

  const getProfile = async () => {
    if (!token.value) return null
    
    try {
      const userData = await authService.getProfile()
      user.value = userData
      localStorage.setItem('user', JSON.stringify(userData))
      return userData
    } catch (error) {
      await logout()
      throw error
    }
  }

  const initAuth = async () => {
    if (token.value) {
      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        user.value = JSON.parse(savedUser)
      }
      
      try {
        await getProfile()
      } catch (error) {
        await logout()
      }
    }
  }

  return {
    token,
    user,
    loading,
    isAuthenticated,
    login,
    orgLogin,
    logout,
    getProfile,
    initAuth
  }
})