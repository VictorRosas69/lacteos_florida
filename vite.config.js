import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['lacteos-florida-4.onrender.com'],
  },
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 5173,
  },
})
