import { defineConfig } from 'vitest/config'  
import viteReact from '@vitejs/plugin-react'  
import tailwindcss from '@tailwindcss/vite'  
import path from 'path'  
import { tanstackRouter } from '@tanstack/router-plugin/vite'  
  
export default defineConfig({  
  plugins: [  
    tanstackRouter({ autoCodeSplitting: true }),  
    viteReact(),  
    tailwindcss(),  
  ],  
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}'],
    exclude: [
      'tests/fixtures/**/*',
      '**/node_modules/**'
    ]
  },
  resolve: {  
    alias: {  
      '@': path.resolve(__dirname, "./src"),  
    },  
  },
})