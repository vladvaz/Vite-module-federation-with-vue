import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import federation from '@originjs/vite-plugin-federation'
import topLevelAwait from 'vite-plugin-top-level-await'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    federation({
      name: 'module-a',
      filename: 'main.js',
      exposes: {
        './Main': './src/App.vue'
      },
      shared: ['vue']
    }),
    topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: '__tla',
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: (i) => `__tla_${i}`
    })
  ],
  build: {
    assetsInlineLimit: 40960,
    minify: true,
    cssCodeSplit: false,
    sourcemap: false,
    rollupOptions: {
      output: {
        minifyInternalExports: false
      }
    }
  }
})
