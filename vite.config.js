import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// /api/... calls are forwarded to the Flask backend on port 5001
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5001',
    },
  },
})
