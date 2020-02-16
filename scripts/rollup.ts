/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
import { rollup } from 'rollup';
import resolvePlugin from '@rollup/plugin-node-resolve';
import replacePlugin from '@rollup/plugin-replace';
import commonjsPlugin from '@rollup/plugin-commonjs';
import { terser as terserPlugin } from 'rollup-plugin-terser';
import chalk from 'chalk';

type GenerateOption = {
  inputFile: string;
  outputFile: string;
  format: 'cjs' | 'es' | 'umd';
  name: string;
  production?: boolean;
};

const generateBundledModules = async ({
  inputFile,
  outputFile,
  format,
  name,
  production = true,
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
      },
    }),
  ];
  if (production) {
    plugins.push(
      replacePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      terserPlugin()
    );
  }
  try {
    const bundle = await rollup({
      input: inputFile,
      external: [
        'react',
        'react-dom',
        'react-is',
        'react-router-dom',
        'react-redux',
        'redux',
        'inversify',
      ],
      plugins,
    });
    const isUmd = format === 'umd';
    await bundle.write({
      file: outputFile,
      format,
      exports: 'named',
      name: isUmd ? name : undefined,
    });
    console.log(chalk.green(`Succeed to generate ${outputFile} bundle.\n`));
  } catch (e) {
    console.log(chalk.red(`Failed to generate ${outputFile} bundle.\n`));
    console.log(chalk.red(e));
  }
};

export { generateBundledModules };
