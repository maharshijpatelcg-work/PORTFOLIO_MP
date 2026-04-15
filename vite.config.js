import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    force: true,
    exclude: [
      '@emailjs/browser',
      'react-icons',
      'react-icons/fa',
      'react-icons/fi',
      'react-icons/si',
    ],
  },
})
