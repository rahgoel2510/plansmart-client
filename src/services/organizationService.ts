import { apiService } from './api'

export interface Organization {
  id: string
  name: string
  slug: string
  settings?: {
    branding?: {
      logoUrl?: string
      primaryColor?: string
    }
  }
}

export class OrganizationService {
  async getOrganizations(): Promise<Organization[]> {
    return apiService.get<Organization[]>('/api/organizations')
  }

  async getOrganizationBySlug(slug: string): Promise<Organization> {
    return apiService.get<Organization>(`/api/organizations/by-slug/${slug}`)
  }

  async createOrganization(data: Partial<Organization>): Promise<Organization> {
    return apiService.post<Organization>('/api/organizations', data)
  }

  async updateOrganization(id: string, data: Partial<Organization>): Promise<Organization> {
    return apiService.put<Organization>(`/api/organizations/${id}`, data)
  }

  async deleteOrganization(id: string): Promise<void> {
    return apiService.delete<void>(`/api/organizations/${id}`)
  }
}

export const organizationService = new OrganizationService()