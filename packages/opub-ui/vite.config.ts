/// <reference types="vitest" />

import * as path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const react = (await import('@vitejs/plugin-react')).default;
  const tsConfigPaths = (await import('vite-tsconfig-paths')).default;

  return {
    plugins: [react(), tsConfigPaths()],
    ssr: {
      external: ['@resvg/resvg-js'],
    },
    optimizeDeps: {
      exclude: ['@resvg/resvg-js'],
      // include: ['react-leaflet', 'leaflet'],
    },
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
      preserveSymlinks: false,
      // dedupe: ['react', 'react-dom'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: `
          //         @use "${path.resolve(__dirname, 'styles/breakpoints').replace(/\\/g, '/')}" as *;
          //     `,
          includePaths: [path.resolve(__dirname, 'styles')],
          additionalData: `@use "breakpoints" as *;`,
        },
      },
    },
  };
});
