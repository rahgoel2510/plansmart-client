import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'
  
  return {
    plugins: [vue(), vueDevTools()],
    base: isProduction ? '/plansmart-client/' : '/',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: isProduction,
          drop_debugger: isProduction
        },
        mangle: {
          safari10: true
        },
        format: {
          comments: false
        }
      },
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            const hash = Math.random().toString(36).substring(2, 8)
            if (id.includes('node_modules')) {
              if (id.includes('vue') || id.includes('vue-router') || id.includes('pinia')) {
                return `fw-${hash}`
              }
              if (id.includes('vuetify')) {
                return `ui-${hash}`
              }
              if (id.includes('chart')) {
                return `ch-${hash}`
              }
              return `vd-${hash}`
            }
            
            if (id.includes('layouts/')) {
              return `ly-${hash}`
            }
            
            if (id.includes('views/')) {
              return `pg-${hash}`
            }
            
            if (id.includes('components/')) {
              return `cp-${hash}`
            }
          },
          assetFileNames: (assetInfo) => {
            const hash = Math.random().toString(36).substring(2, 15)
            
            if (/\\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name || '')) {
              return `a/i/${hash}[extname]`
            }
            if (/\\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name || '')) {
              return `a/f/${hash}[extname]`
            }
            if (/\\.css$/i.test(assetInfo.name || '')) {
              return `a/c/${hash}[extname]`
            }
            return `a/m/${hash}[extname]`
          },
          chunkFileNames: () => {
            const hash = Math.random().toString(36).substring(2, 15)
            return `j/${hash}.js`
          },
          entryFileNames: () => {
            const hash = Math.random().toString(36).substring(2, 15)
            return `j/${hash}.js`
          }
        }
      },
      chunkSizeWarningLimit: 600,
      target: 'es2015'
    },
    esbuild: {
      drop: isProduction ? ['console', 'debugger'] : [],
      legalComments: 'none'
    },
    define: {
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_OPTIONS_API__: true,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    },
    server: {
      port: 5173
    },
    preview: {
      port: 4173,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    },
    optimizeDeps: {
      include: ['vue', 'vue-router', 'pinia', 'vuetify', 'chart.js'],
      force: true
    }
  }
})