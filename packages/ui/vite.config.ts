/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
  },
  resolve: {
    alias: [
      { find: '@utils', replacement: path.resolve(__dirname, '/utils') },
      { find: '@ui', replacement: path.resolve(__dirname, '/src') },
    ],
  },
  css: {
    postcss: null,
    preprocessorOptions: {
      scss: {
        additionalData: `
                @import "${path.resolve(__dirname, '/styles/breakpoints')}";
            `,
      },
    },
  },
});
