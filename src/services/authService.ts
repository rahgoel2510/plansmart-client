import { apiService } from './api'

export interface LoginCredentials {
  email: string
  password: string
}

export interface User {
  id: string
  email: string
  name: string
  role: string
  organizationId?: string
}

export interface AuthResponse {
  user: User
  token: string
}

export class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiService.post<AuthResponse>('/auth/login', credentials)
  }

  async orgLogin(orgSlug: string, credentials: LoginCredentials): Promise<AuthResponse> {
    return apiService.post<AuthResponse>('/auth/login', {
      ...credentials,
      orgSlug
    })
  }

  async getProfile(): Promise<User> {
    return apiService.get<User>('/auth/profile')
  }

  async logout(): Promise<void> {
    return apiService.post<void>('/auth/logout')
  }
}

export const authService = new AuthService()