import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/frontend',

  server: {
    port: 4200,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000/api/v1',
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
      },
    },
  },

  preview: {
    port: 4300,
    host: true,
  },

  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    nxViteTsPaths(),
  ],

  build: {
    outDir: '../../dist/apps/frontend',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})
