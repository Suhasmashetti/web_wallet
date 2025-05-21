import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import polyfillNode from 'rollup-plugin-polyfill-node'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      buffer: 'buffer',
      process: 'process/browser'
    },
  },
  optimizeDeps: {
    include: [
      'crypto-browserify',
      'stream-browserify',
      'buffer',
      'process'
    ],
  },
  build: {
    rollupOptions: {
      plugins: [
        polyfillNode()
      ]
    }
  }
})
