import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['www.4399mc.cn'],
    host: true,
    port: 5173,
    hmr: {
      host: 'www.4399mc.cn'
    }
  }
})
