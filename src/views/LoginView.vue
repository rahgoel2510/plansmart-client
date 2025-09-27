<template>
  <div class="enterprise-login">
    <div class="main-content">
      <div class="login-wrapper">
        <div class="login-card-container">
          <v-card class="professional-login-card" elevation="24">
            <v-row no-gutters>
              <!-- Left Panel -->
              <v-col cols="12" md="7" class="left-panel">
                <div class="value-proposition">
                  <div class="value-content">
                    <div class="brand-showcase mb-6">
                      <div class="floating-logo">
                        <img 
                          src="@/assets/logo.png" 
                          alt="PlanSmart" 
                          class="showcase-logo"
                        >
                      </div>
                      <div class="brand-particles">
                        <div class="particle particle-1"></div>
                        <div class="particle particle-2"></div>
                        <div class="particle particle-3"></div>
                      </div>
                    </div>
                    
                    <div class="value-header mb-3">
                      <h2 class="text-h6 font-weight-bold text-white mb-2">
                        Plan Smart Enterprise
                      </h2>
                      <p class="text-body-2 text-slate-300">
                        Trusted by 500+ organizations worldwide
                      </p>
                    </div>
                    
                    <!-- Compact Stats -->
                    <div class="compact-stats mb-3">
                      <div class="stat-row">
                        <div class="stat-compact">
                          <span class="stat-num">500+</span>
                          <span class="stat-lbl">Clients</span>
                        </div>
                        <div class="stat-compact">
                          <span class="stat-num">99.9%</span>
                          <span class="stat-lbl">Uptime</span>
                        </div>
                        <div class="stat-compact">
                          <span class="stat-num">24/7</span>
                          <span class="stat-lbl">Support</span>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Key Features -->
                    <div class="key-features">
                      <div class="feature-list">
                        <div class="feature-row">
                          <v-icon color="#10b981" size="14" class="me-2">mdi-check</v-icon>
                          <span class="feature-text">AI-powered planning & analytics</span>
                        </div>
                        <div class="feature-row">
                          <v-icon color="#10b981" size="14" class="me-2">mdi-check</v-icon>
                          <span class="feature-text">Multi-tenant architecture</span>
                        </div>
                        <div class="feature-row">
                          <v-icon color="#10b981" size="14" class="me-2">mdi-check</v-icon>
                          <span class="feature-text">Enterprise-grade security</span>
                        </div>
                        <div class="feature-row">
                          <v-icon color="#10b981" size="14" class="me-2">mdi-check</v-icon>
                          <span class="feature-text">Real-time collaboration</span>
                        </div>
                        <div class="feature-row">
                          <v-icon color="#10b981" size="14" class="me-2">mdi-check</v-icon>
                          <span class="feature-text">Advanced reporting & insights</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </v-col>
              
              <!-- Right Panel -->
              <v-col cols="12" md="5" class="right-panel">
                <div class="login-section">
                  <div class="login-container">
                    <!-- Enterprise Header -->
                    <div class="enterprise-header d-md-none mb-4">
                      <div class="d-flex align-center justify-center mb-3">
                        <img src="@/assets/logo.png" alt="PlanSmart" height="32" class="me-2">
                        <div>
                          <h2 class="text-h6 font-weight-bold mb-0">Plan Smart</h2>
                          <p class="text-caption text-medium-emphasis mb-0">Enterprise SaaS</p>
                        </div>
                      </div>
                    </div>
                    
                    <div class="login-header text-center mb-4">
                      <h3 class="text-h5 font-weight-bold text-slate-800 mb-2">
                        Sign In to Your Account
                      </h3>
                      <p class="text-body-2 text-slate-600">
                        Access your Plan Smart workspace
                      </p>
                    </div>
                    
                    <v-form @submit.prevent="handleLogin" class="login-form">
                      <div class="form-group mb-4">
                        <label class="form-label">Email address</label>
                        <v-text-field
                          v-model="form.email"
                          type="email"
                          variant="outlined"
                          placeholder="Enter your work email"
                          :rules="emailRules"
                          density="comfortable"
                          class="enterprise-input"
                          required
                        />
                      </div>

                      <div class="form-group mb-4">
                        <label class="form-label">Password</label>
                        <v-text-field
                          v-model="form.password"
                          :type="showPassword ? 'text' : 'password'"
                          variant="outlined"
                          placeholder="Enter your password"
                          :append-inner-icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                          @click:append-inner="showPassword = !showPassword"
                          :rules="passwordRules"
                          density="comfortable"
                          class="enterprise-input"
                          required
                        />
                      </div>
                      
                      <div class="form-options mb-4">
                        <v-checkbox
                          v-model="rememberMe"
                          label="Keep me signed in"
                          density="compact"
                          class="remember-checkbox"
                          hide-details
                        />
                        <v-btn
                          variant="text"
                          size="small"
                          color="primary"
                          class="forgot-link"
                        >
                          Forgot password?
                        </v-btn>
                      </div>

                      <v-btn
                        type="submit"
                        color="primary"
                        size="x-large"
                        block
                        :loading="loading"
                        class="sign-in-btn mb-4"
                      >
                        Sign in
                      </v-btn>

                      <v-alert
                        v-if="error"
                        type="error"
                        variant="outlined"
                        class="mb-3"
                        closable
                        @click:close="error = ''"
                      >
                        {{ error }}
                      </v-alert>
                    </v-form>
                    
                    <!-- Security Info -->
                    <div class="security-info text-center mt-4">
                      <p class="text-caption text-slate-500">
                        <v-icon size="12" class="me-1">mdi-shield-check</v-icon>
                        Secure & Trusted Platform
                      </p>
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </div>
      </div>
      
      <!-- Contact Support Section -->
      <div class="contact-support-bottom">
        <div class="support-card">
          <div class="support-content">
            <h4 class="support-title">Need Help?</h4>
            <p class="support-text">Our support team is here to assist you 24/7</p>
            <div class="support-actions">
              <v-btn variant="outlined" size="small" class="me-2">
                <v-icon start size="16">mdi-email</v-icon>
                Email Support
              </v-btn>
              <v-btn variant="outlined" size="small">
                <v-icon start size="16">mdi-phone</v-icon>
                Call +1 (555) 123-4567
              </v-btn>
            </div>
          </div>
        </div>
        
        <div class="footer-links text-center mt-3">
          <a href="#" class="footer-link">Privacy</a>
          <span class="mx-2">•</span>
          <a href="#" class="footer-link">Terms</a>
          <span class="mx-2">•</span>
          <a href="#" class="footer-link">Security</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  email: 'goelrah@amazon.com',
  password: 'Password!'
})

const showPassword = ref(false)
const rememberMe = ref(false)
const loading = ref(false)
const error = ref('')

const emailRules = [
  (v: string) => !!v || 'Email is required',
  (v: string) => /.+@.+\..+/.test(v) || 'Please enter a valid email address'
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
  
  try {
    await authStore.login(form.value)
    
    if (rememberMe.value) {
      localStorage.setItem('rememberMe', 'true')
    }
    
    router.push('/dashboard')
  } catch (err: any) {
    error.value = err.response?.data?.error || err.message || 'Invalid credentials. Please try again.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (authStore.isAuthenticated) {
    router.push('/dashboard')
  }
  
  const remembered = localStorage.getItem('rememberMe')
  if (remembered) {
    rememberMe.value = true
  }
})
</script>

<style scoped>
.enterprise-login {
  background: #ffffff;
}

.main-content {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.login-wrapper {
  width: 100%;
  max-width: 1200px;
}

.login-card-container {
  width: 100%;
  max-width: 1000px;
}

.professional-login-card {
  border-radius: 24px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(226, 232, 240, 0.8);
  height: 550px;
}

.left-panel {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  position: relative;
  overflow: hidden;
  height: 550px;
}

.left-panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
  background-size: 600px 600px;
  animation: backgroundFloat 20s ease-in-out infinite;
}

@keyframes backgroundFloat {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(0.5deg); }
}

.value-proposition {
  position: relative;
  z-index: 1;
  padding: 1.5rem;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.value-content {
  max-width: 460px;
  width: 100%;
  text-align: center;
}

.brand-showcase {
  position: relative;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.floating-logo {
  position: relative;
  z-index: 2;
}

.showcase-logo {
  height: 60px;
  width: auto;
  animation: logoFloat 6s ease-in-out infinite;
}

@keyframes logoFloat {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-8px) scale(1.02); }
}

.brand-particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 8px;
  height: 8px;
  background: rgba(59, 130, 246, 0.6);
  border-radius: 50%;
  animation: particleFloat 8s ease-in-out infinite;
}

.particle-1 {
  top: 20%;
  left: 20%;
  animation-delay: 0s;
}

.particle-2 {
  top: 30%;
  right: 25%;
  animation-delay: 2s;
  background: rgba(16, 185, 129, 0.6);
}

.particle-3 {
  bottom: 25%;
  left: 30%;
  animation-delay: 4s;
  background: rgba(245, 158, 11, 0.6);
}

@keyframes particleFloat {
  0%, 100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.6; }
  25% { transform: translateY(-15px) translateX(10px) scale(1.2); opacity: 1; }
  50% { transform: translateY(-8px) translateX(-5px) scale(0.8); opacity: 0.8; }
  75% { transform: translateY(-20px) translateX(8px) scale(1.1); opacity: 0.9; }
}

.value-header h2 {
  color: #ffffff;
  line-height: 1.2;
  animation: fadeInUp 4s ease-in-out infinite;
}

.value-header p {
  color: #cbd5e1;
  line-height: 1.6;
  animation: fadeInUp 4s ease-in-out infinite 0.5s;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  50% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0.9;
    transform: translateY(-5px);
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.stat-item {
  text-align: center;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  animation: statFadeIn 3s ease-in-out infinite;
}

.stat-item:nth-child(1) { animation-delay: 0s; }
.stat-item:nth-child(2) { animation-delay: 0.3s; }
.stat-item:nth-child(3) { animation-delay: 0.6s; }

@keyframes statFadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  50% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0.95;
    transform: translateY(-2px);
  }
}

.stat-item:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.1);
}

.stat-icon {
  margin-bottom: 0.5rem;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  color: #94a3b8;
  font-weight: 500;
}

.features-showcase {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.feature-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  animation: featureFadeIn 4s ease-in-out infinite;
}

.feature-card:nth-child(1) { animation-delay: 0s; }
.feature-card:nth-child(2) { animation-delay: 0.5s; }

@keyframes featureFadeIn {
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  50% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0.95;
    transform: translateX(5px);
  }
}

.feature-card:hover {
  transform: translateX(8px);
  background: rgba(255, 255, 255, 0.1);
}

.feature-icon-bg {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.feature-content {
  flex: 1;
}

.feature-title {
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.feature-desc {
  color: #cbd5e1;
  font-size: 0.875rem;
  line-height: 1.4;
  margin: 0;
}

.right-panel {
  background: linear-gradient(135deg, #fafbfc 0%, #f8fafc 100%);
  height: 550px;
  overflow: hidden;
  border-left: 1px solid rgba(226, 232, 240, 0.5);
}

.login-section {
  padding: 2rem 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
}

.login-container {
  width: 100%;
  max-width: 350px;
}

.mobile-brand-header {
  text-align: center;
  padding: 0 0 1.5rem 0;
}

.mobile-logo-container {
  display: inline-block;
  margin-bottom: 1rem;
}

.mobile-logo {
  height: 48px;
  width: auto;
}

.mobile-brand-name {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.25rem 0;
}

.mobile-brand-tagline {
  font-size: 1rem;
  color: #64748b;
  margin: 0;
}

.login-header h3 {
  color: #1e293b;
}

.login-header p {
  color: #64748b;
}

.login-form {
  width: 100%;
}

.form-group {
  margin-bottom: 0.75rem;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

:deep(.enterprise-input .v-field) {
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

:deep(.enterprise-input .v-field__outline) {
  --v-field-border-opacity: 0.3;
}

:deep(.enterprise-input .v-field--focused .v-field__outline) {
  --v-field-border-opacity: 1;
  --v-theme-primary: #3b82f6;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

:deep(.remember-checkbox .v-label) {
  font-size: 0.875rem;
  color: #64748b;
}

.forgot-link {
  font-size: 0.875rem;
  text-decoration: none;
  padding: 0;
  min-width: auto;
  height: auto;
}

.sign-in-btn {
  background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%) !important;
  color: white !important;
  font-weight: 600;
  text-transform: none;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(79, 70, 229, 0.25);
  transition: all 0.3s ease;
  border: none;
}

.sign-in-btn:hover {
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
  transform: translateY(-1px);
}



.login-footer {
  border-top: 1px solid #f1f5f9;
  padding-top: 2rem;
}

.enterprise-header {
  text-align: center;
}

.enterprise-footer {
  border-top: 1px solid rgba(241, 245, 249, 0.6);
  padding-top: 1rem;
  background: rgba(248, 250, 252, 0.5);
  border-radius: 12px;
  margin-top: 1rem;
}

.security-badges {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.contact-link {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
}

.contact-link:hover {
  text-decoration: underline;
}

.footer-links {
  margin-top: 1rem;
}

.footer-link {
  color: #64748b;
  text-decoration: none;
  font-size: 0.875rem;
}

.footer-link:hover {
  color: #3b82f6;
}

.enterprise-metrics {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.metric-row {
  display: flex;
  gap: 1rem;
}

.metric-item {
  flex: 1;
  text-align: center;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.metric-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1;
  margin-bottom: 0.25rem;
}

.metric-label {
  font-size: 0.75rem;
  color: #cbd5e1;
  font-weight: 500;
}

.enterprise-features {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.feature-item {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
}

.feature-text {
  color: #e2e8f0;
  font-weight: 500;
}

.compact-stats {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 1rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.stat-compact {
  text-align: center;
  flex: 1;
}

.stat-num {
  display: block;
  font-size: 1.25rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1;
}

.stat-lbl {
  display: block;
  font-size: 0.75rem;
  color: #cbd5e1;
  margin-top: 0.25rem;
}

.key-features {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.feature-row {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
}

.feature-row .feature-text {
  color: #e2e8f0;
  font-weight: 400;
}

.security-info {
  padding: 0.5rem;
}

.contact-support-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(226, 232, 240, 0.8);
  padding: 1rem 2rem;
  z-index: 1000;
}

.support-card {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.support-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.support-text {
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 1rem;
}

.support-actions {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.text-slate-800 {
  color: #1e293b !important;
}

.text-slate-600 {
  color: #475569 !important;
}

.text-slate-500 {
  color: #64748b !important;
}

@media (max-width: 768px) {
  .left-panel {
    display: none;
  }
  
  .main-content {
    padding: 1rem;
  }
  
  .professional-login-card {
    border-radius: 16px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

@media (max-width: 640px) {
  .main-content {
    padding: 0.5rem 0.5rem 8rem 0.5rem;
  }
  
  .login-section {
    padding: 1.5rem 1rem;
  }
  
  .professional-login-card {
    border-radius: 12px;
  }
  
  .contact-support-bottom {
    padding: 0.75rem 1rem;
  }
  
  .support-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .support-actions .v-btn {
    width: 100%;
    max-width: 200px;
  }
}
</style>