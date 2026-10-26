import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // The creator stats page is a standalone page next to the main scroll.
      input: {
        main: 'index.html',
        creators: 'creators/index.html',
      },
    },
  },
})
