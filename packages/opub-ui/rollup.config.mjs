import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import svgr from '@svgr/rollup';
import { readFileSync } from 'fs';
import copy from 'rollup-plugin-copy';
import peerDeps from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import { visualizer } from 'rollup-plugin-visualizer';

const pkg = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url).pathname)
);

const extensions = ['.js', '.ts', '.jsx', '.tsx'];
const getPlugins = () => {
  const defaultTs = {
    exclude: [
      'node_modules',
      'build',
      'dist',
      'scripts',
      'acceptance-tests',
      'webpack',
      '.storybook',
      'jest',
      'src/stories/**',
      '**/*.stories.js',
      '**/*.stories.jsx',
      '**/*.stories.ts',
      '**/*.stories.tsx',
      '**/*.test.js',
      '**/*.test.jsx',
      '**/*.test.ts',
      '**/*.test.tsx',
    ],
    compilerOptions: {
      rootDir: 'src',
    },
  };

  const typeScriptOptions = {
    tsconfig: './tsconfig.json',
    declaration: true,
    declarationDir: 'dist',
    ...defaultTs,
  };

  return [
    peerDeps(),
    resolve({ extensions }),
    commonjs(),
    copy({
      targets: [{ src: 'assets', dest: 'dist' }],
    }),
    svgr(),
    postcss({
      extract: false,
      modules: true,
      use: ['sass'],
    }),
    typescript(typeScriptOptions),
    terser(),
    // visualizer({
    //   filename: 'bundle-analysis.html',
    // }),
  ];
};

const rollup = (_args) => {
  const external = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ];

  return {
    input: './src/index.ts',
    output: {
      dir: 'dist',
      format: 'esm',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
    },
    plugins: getPlugins(),
    external,
  };
};

export default rollup;
