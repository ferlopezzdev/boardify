import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@hooks": "/src/hooks",
      "@api": "/src/api",
      "@services": "/src/services",
      "@pages": "/src/pages",
      "@components": "/src/components",
    },
  },
})
