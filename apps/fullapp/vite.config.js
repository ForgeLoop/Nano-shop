import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite'

// https://vite.dev/config/
export default defineConfig({
  server: { port: 3001 },
  plugins: [
    react(),
    federation({
      name: 'fullapp',
      filename: 'remoteEntry.js',
      exposes: {
        './FullApp': './src/FullApp.tsx',
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
    }),
  ],
});
