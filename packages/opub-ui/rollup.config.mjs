import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import svgr from '@svgr/rollup';
import fs, { readFileSync } from 'fs';
import peerDeps from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import { visualizer } from 'rollup-plugin-visualizer';

import * as path from 'path';

const pkg = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url).pathname)
);

export const getFiles = (entry, extensions = [], excludeExtensions = []) => {
  let fileNames = [];
  const dirs = fs.readdirSync(entry);

  dirs.forEach((dir) => {
    const path = `${entry}/${dir}`;

    if (fs.lstatSync(path).isDirectory()) {
      fileNames = [
        ...fileNames,
        ...getFiles(path, extensions, excludeExtensions),
      ];

      return;
    }

    if (
      !excludeExtensions.some((exclude) => dir.endsWith(exclude)) &&
      extensions.some((ext) => dir.endsWith(ext))
    ) {
      fileNames.push(path);
    }
  });

  return fileNames;
};

const extensions = ['.js', '.ts', '.jsx', '.tsx'];
const excludeExtensions = [
  'test.js',
  'test.ts',
  'test.jsx',
  'test.tsx',
  'stories.js',
  'stories.ts',
  'stories.jsx',
  'stories.tsx',
];

const input = [
  './src/index.ts',
  ...getFiles('./src/components', extensions, excludeExtensions),
  ...getFiles('./src/tokens', extensions, excludeExtensions),
  ...getFiles('./src/types', extensions, excludeExtensions),
  ...getFiles('./src/utils', extensions, excludeExtensions),
];

const getOutput = (format = 'esm') => {
  if (format === 'esm') {
    return {
      dir: path.dirname(pkg.module),
      format,
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
    };
  }

  return {
    dir: path.dirname(pkg.main),
    preserveModules: true,
    preserveModulesRoot: 'src',
    format,
  };
};

const getPlugins = (format = 'esm') => {
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

  const typeScriptOptions =
    format === 'esm'
      ? {
          tsconfig: './tsconfig.json',
          declaration: true,
          declarationDir: path.dirname(pkg.module),
          ...defaultTs,
        }
      : {
          ...defaultTs,
        };

  return [
    peerDeps(),
    resolve({ extensions }),
    commonjs(),
    typescript(typeScriptOptions),
    svgr(),
    postcss({
      extract: false,
      modules: true,
      use: ['sass'],
    }),
    terser(),
    visualizer({
      filename: 'bundle-analysis.html',
    }),
  ];
};

const rollup = (_args) => {
  const external = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ];

  return [
    // cjs configuration
    {
      input: './src/index.ts',
      output: getOutput('cjs'),
      plugins: getPlugins('cjs'),
      external,
    },
    // esm configuration
    {
      input,
      output: getOutput('esm'),
      plugins: getPlugins('esm'),
      external,
    },
  ];
};

export default rollup;
