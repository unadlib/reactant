/* eslint-disable no-console */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
import commonjsPlugin from '@rollup/plugin-commonjs';
import resolvePlugin from '@rollup/plugin-node-resolve';
import replacePlugin from '@rollup/plugin-replace';
import chalk from 'chalk';
import path from 'path';
import { rollup } from 'rollup';
import { terser as terserPlugin } from 'rollup-plugin-terser';

type GenerateOption = {
  inputFile: string;
  outputFile: string;
  format: 'cjs' | 'es' | 'umd';
  name: string;
  production?: boolean;
  banner?: string;
};

const isProduction = process.env.NODE_ENV === 'production';

const generateBundledModules = async ({
  inputFile,
  outputFile,
  format,
  name,
  production = true,
  banner,
}: GenerateOption) => {
  console.log(`Generating bundle:`);
  console.log(chalk.grey(`-> ${outputFile}`));
  const plugins = [
    resolvePlugin(),
    commonjsPlugin({
      namedExports: {
        react: Object.keys(require('react')),
        'react-dom': Object.keys(require('react-dom')),
        'react-is': Object.keys(require('react-is')),
        'react-router-dom': Object.keys(require('react-router-dom')),
        'react-redux': Object.keys(require('react-redux')),
        redux: Object.keys(require('redux')),
        inversify: Object.keys(require('inversify')),
        reselect: Object.keys(require('reselect')),
      },
    }),
  ];
  if (production) {
    plugins.push(
      replacePlugin({
        'process.env.NODE_ENV': isProduction ? "'production'" : "'development'",
        __DEV__: isProduction ? 'false' : 'true',
      }),
      terserPlugin()
    );
  }
  try {
    const { dependencies = {}, devDependencies = {} } = require(path.resolve(
      outputFile,
      '../../package.json'
    ));
    const external = Object.keys({ ...dependencies, ...devDependencies });
    const bundle = await rollup({
      input: inputFile,
      external,
      plugins,
    });
    const isUmd = format === 'umd';
    await bundle.write({
      file: outputFile,
      format,
      exports: 'named',
      name: isUmd ? name : undefined,
      banner,
    });
    console.log(chalk.green(`Succeed to generate ${outputFile} bundle.\n`));
  } catch (e) {
    console.log(chalk.red(`Failed to generate ${outputFile} bundle.\n`));
    console.log(chalk.red(e));
  }
};

export { generateBundledModules };
