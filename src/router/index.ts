import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useOrgStore } from '@/stores/organization'
import type { RouteRecordRaw } from 'vue-router'

// Lazy loading for performance
const LoginView = () => import('../views/LoginView.vue')
const DashboardView = () => import('../views/DashboardView.vue')
const OrganizationsView = () => import('../views/OrganizationsView.vue')
const AnalyticsView = () => import('../views/AnalyticsView.vue')
const SettingsView = () => import('../views/SettingsView.vue')
const OrgLoginView = () => import('../views/OrgLoginView.vue')
const OrgDashboardView = () => import('../views/OrgDashboardView.vue')
const TeamsView = () => import('../views/TeamsView.vue')
const ProjectsView = () => import('../views/ProjectsView.vue')
const ErrorView = () => import('../views/ErrorView.vue')

const routes: RouteRecordRaw[] = [
  // 🔐 Platform Authentication Routes
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { requiresAuth: false, layout: 'none' }
  },
  
  // 👑 Platform Admin Routes (Super Admin)
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: '/organizations',
    name: 'organizations',
    component: OrganizationsView,
    meta: { requiresAuth: true, roles: ['SUPER_ADMIN'] }
  },
  {
    path: '/analytics',
    name: 'analytics',
    component: AnalyticsView,
    meta: { requiresAuth: true, roles: ['SUPER_ADMIN'] }
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView,
    meta: { requiresAuth: true, roles: ['SUPER_ADMIN'] }
  },

  // 🏢 Organization-Scoped Routes (Multi-Tenant)
  {
    path: '/:orgSlug',
    name: 'org-home',
    component: OrgLoginView,
    meta: { requiresAuth: false, layout: 'none', orgContext: true }
  },
  {
    path: '/:orgSlug/login',
    name: 'org-login',
    component: OrgLoginView,
    meta: { requiresAuth: false, layout: 'none', orgContext: true }
  },
  {
    path: '/:orgSlug/dashboard',
    name: 'org-dashboard',
    component: OrgDashboardView,
    meta: { 
      requiresAuth: true, 
      layout: 'org', 
      orgContext: true,
      roles: ['ORG_USER', 'ORG_ADMIN', 'EXECUTIVE', 'ENGINEERING_MANAGER', 'PRODUCT_MANAGER']
    }
  },
  {
    path: '/:orgSlug/teams',
    name: 'org-teams',
    component: TeamsView,
    meta: { 
      requiresAuth: true, 
      layout: 'org', 
      orgContext: true,
      roles: ['ORG_USER', 'ORG_ADMIN', 'EXECUTIVE', 'ENGINEERING_MANAGER']
    }
  },
  {
    path: '/:orgSlug/projects',
    name: 'org-projects',
    component: ProjectsView,
    meta: { 
      requiresAuth: true, 
      layout: 'org', 
      orgContext: true,
      roles: ['ORG_USER', 'ORG_ADMIN', 'EXECUTIVE', 'PRODUCT_MANAGER']
    }
  },
  {
    path: '/:orgSlug/analytics',
    name: 'org-analytics',
    component: AnalyticsView,
    meta: { 
      requiresAuth: true, 
      layout: 'org', 
      orgContext: true,
      roles: ['ORG_ADMIN', 'EXECUTIVE', 'ENGINEERING_MANAGER', 'PRODUCT_MANAGER']
    }
  },
  {
    path: '/:orgSlug/settings',
    name: 'org-settings',
    component: SettingsView,
    meta: { 
      requiresAuth: true, 
      layout: 'org', 
      orgContext: true,
      roles: ['ORG_ADMIN']
    }
  },

  // 🔄 System & Error Routes
  {
    path: '/error',
    name: 'error',
    component: ErrorView,
    meta: { requiresAuth: false }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: ErrorView,
    meta: { requiresAuth: false }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 🛡️ Multi-Tenant Navigation Guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const orgStore = useOrgStore()
  
  const orgSlug = to.params.orgSlug as string
  const meta = to.meta as any
  
  // Organization context validation
  if (orgSlug) {
    // Validate org slug format
    if (!/^[a-zA-Z0-9-]+$/.test(orgSlug) || orgSlug.length < 2) {
      return next('/error')
    }
    
    // Set organization context
    try {
      await orgStore.setCurrentOrganization(orgSlug)
    } catch (error) {
      return next('/error')
    }
    
    // For unauthenticated users in org context
    if (!authStore.isAuthenticated && meta.requiresAuth) {
      return next(`/${orgSlug}/login`)
    }
  }
  
  // Authentication check
  if (meta.requiresAuth && !authStore.isAuthenticated) {
    return next(orgSlug ? `/${orgSlug}/login` : '/login')
  }
  
  // Role-based access control
  if (meta.roles && authStore.user) {
    const userRole = authStore.user.role
    if (!meta.roles.includes(userRole)) {
      return next('/error')
    }
  }
  
  // Organization isolation check
  if (orgSlug && authStore.user && authStore.user.organizationId) {
    const currentOrg = orgStore.currentOrganization
    if (currentOrg && currentOrg.id !== authStore.user.organizationId) {
      return next('/error') // User doesn't belong to this organization
    }
  }
  
  next()
})

export default router

// Route types for TypeScript
export interface RouteMeta {
  requiresAuth?: boolean
  roles?: string[]
  layout?: 'none' | 'org' | 'admin'
  orgContext?: boolean
}
