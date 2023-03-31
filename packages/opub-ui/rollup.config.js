import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import svgr from '@svgr/rollup';
import peerDeps from 'rollup-plugin-peer-deps-external';
import scss from 'rollup-plugin-scss';
import { terser } from 'rollup-plugin-terser';
import visualizer from 'rollup-plugin-visualizer';
import postcss from 'rollup-plugin-postcss';
import fs from 'fs';

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

export default {
  input: [
    './src/index.ts',
    ...getFiles('./src/components', extensions, excludeExtensions),
    ...getFiles('./src/tokens', extensions, excludeExtensions),
    ...getFiles('./src/types', extensions, excludeExtensions),
    ...getFiles('./src/utils', extensions, excludeExtensions),
  ],
  output: {
    dir: 'dist',
    format: 'esm',
    preserveModules: true,
    preserveModulesRoot: 'src',
    sourcemap: true,
  },
  plugins: [
    peerDeps(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist',
    }),
    svgr(),
    postcss({
      extract: false,
      modules: true,
      use: ['sass'],
    }),
    terser(),
    // visualizer({
    //   filename: 'bundle-analysis.html',
    //   open: true,
    // }),
  ],
};

// export default [
//   {
//     input: './src/index.ts',
//     output: [
//       {
//         format: 'cjs',
//         file: 'build/cjs/index.js',
//         entryFileNames: '[name][assetExtname].js',
//         exports: 'named',
//       },
//       {
//         format: 'esm',
//         file: 'build/esm/index.js',
//         entryFileNames: '[name][assetExtname].js',
//       },
//     ],
//     plugins: [
//       commonjs(),
//       scss({ output: false }),
//       typescript({ tsconfig: './tsconfig.json' }),
//       alias({
//         entries: {
//           '@ui/*': './src/components/*',
//         },
//       }),
//       svgr(),
//       externals({ deps: true, packagePath: './package.json' }),
//       nodeResolve({ extensions }),
//     ],
//     external: [...Object.keys(pkg.peerDependencies)],
//   },
//   // {
//   //   input: 'dist/esm/types/index.d.ts',
//   //   output: [{ file: 'dist/index.d.ts', format: 'esm' }],
//   //   plugins: [dts()],
//   // },
// ];
