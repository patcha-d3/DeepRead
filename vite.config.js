import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/ol-covers': {
        target: 'https://covers.openlibrary.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ol-covers/, ''),
      },
      '/ol-api': {
        target: 'https://openlibrary.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ol-api/, ''),
      },
    },
  },
});
