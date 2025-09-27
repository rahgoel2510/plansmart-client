<template>
  <v-footer app class="app-footer">
    <v-container>
      <v-row align="center">
        <v-col cols="12" md="6">
          <div class="footer-content">
            <span class="footer-app-name">PlanSmart Enterprise</span>
            <span class="footer-version">v{{ version }}</span>
          </div>
        </v-col>
        <v-col cols="12" md="6" class="text-md-right">
          <div class="footer-links">
            <a href="#" class="footer-link">Privacy</a>
            <span class="mx-2">•</span>
            <a href="#" class="footer-link">Terms</a>
            <span class="mx-2">•</span>
            <a href="#" class="footer-link">Support</a>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
const version = '1.0.0'
</script>

<style scoped>
.app-footer {
  background-color: rgb(var(--v-theme-surface));
  border-top: 1px solid rgb(var(--v-theme-outline));
  padding: 1rem 0;
}

.footer-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-app-name {
  font-weight: 600;
  color: rgb(var(--v-theme-primary));
}

.footer-version {
  font-size: 0.75rem;
  color: rgb(var(--v-theme-on-surface-variant));
  background: rgb(var(--v-theme-surface-variant));
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
}

.footer-links {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.footer-link {
  color: rgb(var(--v-theme-on-surface-variant));
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s;
}

.footer-link:hover {
  color: rgb(var(--v-theme-primary));
}

@media (max-width: 960px) {
  .footer-links {
    justify-content: flex-start;
    margin-top: 0.5rem;
  }
}
</style>