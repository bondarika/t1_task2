import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app': resolve(__dirname, 'src/app'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@features': resolve(__dirname, 'src/features'),
      '@entities': resolve(__dirname, 'src/entities'),
      '@shared': resolve(__dirname, 'src/shared'),
      '@widgets': resolve(__dirname, 'src/widgets'),
    },
  },
  server: {
    allowedHosts: ['localhost'],
    port: 5173,
    proxy: {
      '/api': {
        changeOrigin: true,
        secure: false,
        target: 'http://localhost:4000',
      },
    },
    strictPort: true,
  },
});
