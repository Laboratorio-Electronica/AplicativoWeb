import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 9191, // Aquí puedes poner el puerto que desees
    host: '0.0.0.0',
  }
})
