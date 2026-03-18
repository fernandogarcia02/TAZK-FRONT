import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    host: true,
    allowedHosts: [
      'nonmunicipal-dorthea-nutritively.ngrok-free.dev', // Tu URL actual
      '.ngrok-free.dev',  // Esto permite cualquier subdominio de ngrok dev
      '.ngrok-free.app'   // Esto permite cualquier subdominio de ngrok app
    ],
    proxy:{
      '/api' : 'http://localhost:3000'
    }
  },
  plugins: [react()],
})
