/// <reference types="vitest" />

import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [react(), tsConfigPaths()],
  test: {
    globals: true,
    environment: 'happy-dom',
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
