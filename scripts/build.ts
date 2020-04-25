import path from 'path';
import { compile } from './typescript';
import { generateBundledModules } from './rollup';

process.chdir(path.resolve(__dirname, '..'));

console.log(`\nBuilding...\n`);

compile(async ({ currentPath, name, packageJson }) => {
  const banner = packageJson.bin ? '#!/usr/bin/env node' : undefined;
  await generateBundledModules({
    inputFile: path.resolve(currentPath, 'build/index.js'),
    outputFile: path.resolve(currentPath, 'dist/index.cjs.js'),
    format: 'cjs',
    name,
    banner,
  });
  if (!packageJson.bin) {
    await generateBundledModules({
      inputFile: path.resolve(currentPath, 'build/index.js'),
      outputFile: path.resolve(currentPath, 'dist/index.esm.js'),
      format: 'es',
      name,
    });
    await generateBundledModules({
      inputFile: path.resolve(currentPath, 'build/index.js'),
      outputFile: path.resolve(currentPath, 'dist/index.umd.js'),
      format: 'umd',
      name,
    });
  }
});
