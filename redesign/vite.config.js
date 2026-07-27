import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // three is large and rarely changes — keep it out of the app chunk so a copy
  // edit doesn't force everyone to re-download the renderer.
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          motion: ['framer-motion']
        }
      }
    }
  }
})
