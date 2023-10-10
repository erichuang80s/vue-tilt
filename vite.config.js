import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'


export default defineConfig({
  plugins: [vue()],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'src/lib/main.js'),
      name: 'VueTilt',
      formats: ['iife', 'es'],
      fileName: (format) => {
        const fileName = 'vue-tilt'
        return format === 'es' ? fileName + '.esm.js' : fileName + '.js'
      },
    },
    minify: 'esbuild',
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        }
      },
    }
  }
})
