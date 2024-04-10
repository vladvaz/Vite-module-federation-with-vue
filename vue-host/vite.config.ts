import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'localhost',
    port: 5000
  },
  cacheDir: 'node_modules/.cacheDir',
  plugins: [
    vue(),
    vueJsx(),
    federation({
      name: 'host',
      filename: 'main.js',
      remotes: {
        remoteName: ''
      },
      shared: ['vue']
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        minifyInternalExports: false
      }
    }
  }
})
