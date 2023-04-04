/// <reference types="vitest" />

import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
  plugins: [react(), tsConfigPaths()],
  test: {
    globals: true,
    environment: 'happy-dom',
  },
  resolve: {
    alias: [{ find: '@ui', replacement: path.resolve(__dirname, '/src') }],
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
