/// <reference types="vitest" />

import * as path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [react(), tsConfigPaths()],
  ssr: {
    external: ['@resvg/resvg-js'],
  },
  optimizeDeps: { exclude: ['@resvg/resvg-js'] },
  build: {
    rollupOptions: {
      external: ['@resvg/resvg-js'],
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
  },
  resolve: {
    preserveSymlinks: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
                @import "${path.resolve(__dirname, '/styles/breakpoints')}";
            `,
      },
    },
  },
}));
