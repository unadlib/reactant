/* eslint-disable no-console */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import path from 'path';
import { rollup } from 'rollup';
import resolvePlugin from '@rollup/plugin-node-resolve';
import replacePlugin from '@rollup/plugin-replace';
import commonjsPlugin from '@rollup/plugin-commonjs';
import terserPlugin from '@rollup/plugin-terser';
import chalk from 'chalk';

type GenerateOption = {
  inputFile: string;
  outputFile: string;
  format: 'cjs' | 'es' | 'umd';
  name: string;
  banner?: string;
};

type GenerateEsmModulesOption = {
  inputFiles: string[];
  outputDir: string;
  banner?: string;
};

const writeEsmPackageJson = (outputDir: string) => {
  fs.writeFileSync(
    path.resolve(outputDir, 'package.json'),
    JSON.stringify({ type: 'module' }, null, 2)
  );
};

const getExternalModules = (outputPath: string) => {
  const { dependencies = {}, devDependencies = {} } = require(path.resolve(
    outputPath,
    '../../package.json'
  ));
  return Object.keys({ ...dependencies, ...devDependencies });
};

const createPlugins = (format: GenerateOption['format']) => {
  const isUmd = format === 'umd';
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
  plugins.push(
    replacePlugin({
      __DEV__: isUmd ? 'false' : "process.env.NODE_ENV !== 'production'",
    })
  );
  if (isUmd) {
    plugins.push(terserPlugin());
  }
  return plugins;
};

const generateBundledModules = async ({
  inputFile,
  outputFile,
  format,
  name,
  banner,
}: GenerateOption) => {
  console.log(`Generating bundle:`);
  console.log(chalk.grey(`-> ${outputFile}`));
  const isUmd = format === 'umd';
  const plugins = createPlugins(format);
  try {
    const external = getExternalModules(outputFile);
    const bundle = await rollup({
      input: inputFile,
      external,
      plugins,
    });
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

const generateEsmModules = async ({
  inputFiles,
  outputDir,
  banner,
}: GenerateEsmModulesOption) => {
  console.log(`Generating bundle:`);
  console.log(chalk.grey(`-> ${outputDir}`));
  try {
    const bundle = await rollup({
      input: inputFiles,
      external: getExternalModules(outputDir),
      plugins: createPlugins('es'),
      treeshake: {
        moduleSideEffects: false,
      },
    });
    await bundle.write({
      dir: outputDir,
      format: 'es',
      banner,
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: path.dirname(inputFiles[0]),
      entryFileNames: '[name].js',
      chunkFileNames: '[name].js',
    });
    writeEsmPackageJson(outputDir);
    console.log(chalk.green(`Succeed to generate ${outputDir} esm modules.\n`));
  } catch (e) {
    console.log(chalk.red(`Failed to generate ${outputDir} esm modules.\n`));
    console.log(chalk.red(e));
  }
};

export { generateBundledModules, generateEsmModules };
