import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@hooks": "/src/hooks",
      "@services": "/src/services",
      "@pages": "/src/pages",
      "@components": "/src/components",
      "@utils": "/src/utils",
      "@context": "/src/context"
    },
  },
})
