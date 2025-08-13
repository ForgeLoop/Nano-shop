import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'

export default defineConfig({
  resolve: {
    alias: [
      { find: '@', replacement: '/src' }
    ],
  },
  plugins: [
    react(),
    federation({
      name: 'shell',
      //filename: 'remoteEntry.js',
      remotes: {
        // Add your microfrontends here as you create them
        // Example: 'products': 'products@http://localhost:3001/remoteEntry.js'
        fullapp: {
          type: "module",
          name: "fullapp",
          entry: "http://localhost:3001/remoteEntry.js"
        }
      },
      shared: {
        react: {
          singleton: true
        },
        'react-dom': {
          singleton: true
        },
        'react-router-dom': {
          singleton: true
        },
        antd: {
          singleton: true
        }
      }
    })
  ],
  server: {
    port: 3000
  },
})
