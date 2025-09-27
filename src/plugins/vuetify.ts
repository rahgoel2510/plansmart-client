import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { md3 } from 'vuetify/blueprints'

const orgPlannerTheme = {
  dark: false,
  colors: {
    primary: '#ff9900',
    'primary-darken-1': '#e67e22',
    secondary: '#232f3e',
    'secondary-darken-1': '#1a252f',
    accent: '#ff9900',
    error: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    success: '#28a745',
    surface: '#ffffff',
    background: '#f8fafc',
    'on-primary': '#ffffff',
    'on-secondary': '#ffffff',
    'on-surface': '#232f3e',
    'on-background': '#232f3e',
  },
}

const orgPlannerDarkTheme = {
  dark: true,
  colors: {
    primary: '#ffb84d',
    'primary-darken-1': '#ff9900',
    secondary: '#37475a',
    'secondary-darken-1': '#232f3e',
    accent: '#ffb84d',
    error: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    success: '#28a745',
    surface: '#1e1e1e',
    background: '#121212',
    'on-primary': '#000000',
    'on-secondary': '#ffffff',
    'on-surface': '#ffffff',
    'on-background': '#ffffff',
  },
}

export default createVuetify({
  blueprint: md3,
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: 'orgPlannerTheme',
    themes: {
      orgPlannerTheme,
      orgPlannerDarkTheme,
    },
  },
  defaults: {
    VCard: {
      elevation: 2,
      rounded: 'lg',
    },
    VBtn: {
      rounded: 'lg',
      style: 'text-transform: none;',
      color: 'primary',
    },
    VTextField: {
      variant: 'outlined',
      density: 'comfortable',
      color: 'primary',
    },
    VSelect: {
      variant: 'outlined',
      density: 'comfortable',
      color: 'primary',
    },
    VCheckbox: {
      color: 'primary',
    },
    VRadio: {
      color: 'primary',
    },
    VSwitch: {
      color: 'primary',
    },
    VProgressCircular: {
      color: 'primary',
    },
    VProgressLinear: {
      color: 'primary',
    },
  },
})