import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    // Puedes dejar los allowedHosts de ngrok si vas a seguir probando en local
    allowedHosts: [
      'nonmunicipal-dorthea-nutritively.ngrok-free.dev',
      '.ngrok-free.dev',
      '.ngrok-free.app'
    ],
    // COMENTA O ELIMINA EL PROXY cuando empieces a usar la variable de entorno
    /* proxy:{
      '/api' : 'http://localhost:3000'
    } 
    */
  },
})