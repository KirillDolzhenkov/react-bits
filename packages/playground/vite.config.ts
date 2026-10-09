import { fileURLToPath } from 'node:url'

import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

const reactDir = fileURLToPath(new URL('./node_modules/react', import.meta.url))
const reactDomDir = fileURLToPath(new URL('./node_modules/react-dom', import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: 'react-bits',
        replacement: fileURLToPath(new URL('../core/src/index.ts', import.meta.url)),
      },
      { find: /^react$/, replacement: reactDir },
      { find: /^react-dom$/, replacement: reactDomDir },
      { find: /^react\/jsx-runtime$/, replacement: `${reactDir}/jsx-runtime` },
      { find: /^react\/jsx-dev-runtime$/, replacement: `${reactDir}/jsx-dev-runtime` },
    ],
    dedupe: ['react', 'react-dom'],
  },
  server: {
    fs: {
      allow: [fileURLToPath(new URL('..', import.meta.url))],
    },
  },
})
