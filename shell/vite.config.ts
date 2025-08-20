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
        // Example: 'products': 'products@http://localhost:3001/remoteEntry.js'
        fullapp: {
          type: "module",
          name: "fullapp",
          entry: "http://localhost:3001/remoteEntry.js"
          //PARA PROBAR EN TU CELU LA APP
          //COMENTAR EL ENTRY ANTERIOR Y DESCOMENTAR LA DE ABAJO
          //PNPM RUN DEV --HOST EN FULLAPP Y EN SHELL
          //CAMBIAR POR TU IP EL IP QUE ESTA EN ENTRY
          //EN TU NAVEGADOR http://192.168.0.30:3000
          //entry: "http://192.168.0.30:3001/remoteEntry.js" 
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
