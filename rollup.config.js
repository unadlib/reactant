/* eslint-disable import/no-dynamic-require */
/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-nocheck
import path from 'path';
import clear from 'rollup-plugin-clear';
import commonjs from 'rollup-plugin-commonjs';
import copy from 'rollup-plugin-copy';
import resolve from 'rollup-plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import replace from 'rollup-plugin-replace';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import url from 'rollup-plugin-url';

import { getAllExternalImport } from './scripts/libs/getAllExternalImport';

const tsconfigPath = path.join(process.cwd(), `../../tsconfig.json`);
const tsconfig = require(tsconfigPath);

const sourceDir = path.join(process.cwd());
const pkg = require(path.join(sourceDir, './package.json'));

const pkgName = pkg.name;

const targetDir = path.join('../../', tsconfig.compilerOptions.outDir, pkgName);

export default {
  input: path.join(sourceDir, 'index.ts'),
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
    ...getAllExternalImport(path.join(sourceDir, 'src')),
  ],
  output: [
    {
      format: 'cjs',
      file: path.join(targetDir, pkg.main),
      sourcemap: true,
    },
    {
      format: 'esm',
      exports: 'named',
      file: path.join(targetDir, pkg.module),
      sourcemap: true,
    },
    {
      format: 'umd',
      name: pkg.name,
      file: path.join(targetDir, pkg.browser),
      sourcemap: true,
    },
  ],
  plugins: [
    clear({
      targets: [targetDir],
      watch: true,
    }),
    external(),
    postcss({
      modules: true,
    }),
    url({ exclude: ['**/*.svg'] }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    commonjs(),
    typescript({
      rollupCommonJSResolveHack: true,
      useTsconfigDeclarationDir: true,
      clean: true,
      tsconfig: tsconfigPath,
      tsconfigOverride: {
        include: [`packages/${pkgName}/**/*`],
        exclude: ['/**/*.test.ts', '/**/*.test.tsx'],
        compilerOptions: {
          declarationDir: `./dist/${pkgName}`,
          noUnusedLocals: true,
        },
      },
    }),
    sourceMaps(),
    copy({
      targets: [
        { src: path.join(sourceDir, 'README.md'), dest: targetDir },
        { src: path.join(sourceDir, 'package.json'), dest: targetDir },
      ],
    }),
  ],
};
