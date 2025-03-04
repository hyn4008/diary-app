import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/home': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/create': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/update': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/delete': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/auth/login': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/auth/signup': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  }
})
