import { readFileSync } from 'fs';
import path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import svgr from '@svgr/rollup';
import banner2 from 'rollup-plugin-banner2';
import copy from 'rollup-plugin-copy';
import { externals } from 'rollup-plugin-node-externals';
import postcss from 'rollup-plugin-postcss';

const pkg = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url).pathname)
);

const rollup = (_args) => {
  const external = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ];

  return {
    input: ['./src/index.ts', './src/viz.ts'],
    output: {
      dir: 'dist',
      format: 'esm',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
    },
    plugins: getPlugins(),
    external,
    onwarn(warning, warn) {
      // Skip certain warnings
      if (warning.message.includes('"use client"')) return;
      if (warning.message.includes('.module.scss')) return;

      // Use default for everything else
      warn(warning);
    },
  };
};

const extensions = ['.js', '.ts', '.jsx', '.tsx'];
const getPlugins = () => {
  const typeScriptOptions = {
    tsconfig: './tsconfig.json',

    exclude: [
      'node_modules',
      'build',
      'dist',
      '/docs',
      'scripts',
      '.storybook',
      '**/*.stories.tsx',
      '**/*.test.tsx',
    ],
    compilerOptions: {
      rootDir: 'src',
    },
  };

  return [
    postcss({
      config: {
        path: './postcss.config.js',
      },
      minimize: true,
      inject: {
        insertAt: 'top',
      },
      modules: false,
      extensions: ['sass', '.css'],
      extract: path.resolve('dist/assets/styles-bundled.css'),
    }),

    svgr(),
    nodeResolve({ extensions }),
    commonjs(),
    externals({ deps: true, packagePath: './package.json' }),
    copy({
      targets: [{ src: 'assets', dest: 'dist' }],
    }),
    typescript(typeScriptOptions),
    terser(),
    banner2(() => `'use client';`),
  ];
};

export default rollup;
