/// <reference types="vitest" />

import { readFileSync } from 'fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import dts from 'vite-plugin-dts';
import EsLint from 'vite-plugin-linter';
import tsConfigPaths from 'vite-tsconfig-paths';
const { EsLinter, linterPlugin } = EsLint;
import pkg from './package.json';

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
  plugins: [
    react(),
    tsConfigPaths(),
    linterPlugin({
      include: ['./src}/**/*.{ts,tsx}'],
      linters: [new EsLinter({ configEnv })],
    }),
    dts({
      include: ['src/components/'],
    }),
  ],
  build: {
    lib: {
      entry: resolve('src', 'components/index.ts'),
      name: '@opub-cdl/ui',
      formats: ['es', 'umd'],
      fileName: (format) => `opub.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(pkg.peerDependencies)],
    },
  },
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
