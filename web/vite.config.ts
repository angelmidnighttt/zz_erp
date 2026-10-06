import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Keep in sync with "paths" in tsconfig.app.json and moduleNameMapper in jest.config.js.
    alias: [{ find: '~', replacement: '/src' }]
  }
  // base: './'
})
