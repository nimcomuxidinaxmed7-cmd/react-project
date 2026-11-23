
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  base: process.env.NETLIFY ? '/' : '/react-project/',


  test: {
    environment: 'jsdom',
    setupFiles: './src/test-setup.js',
    globals: true,

    coverage: {
      provider: 'v8',
      include: ['src/**/*.{js,jsx}'],
      exclude: [
        'src/**/*.test.{js,jsx}',
        'src/test-setup.js'
      ],
      reporter: ['text', 'html'],

      thresholds: {
        statements: 70,
        functions: 70,
        lines: 70,
        branches: 60
      }
    }
  }
})
