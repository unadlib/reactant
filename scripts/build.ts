import path from 'path';
import { compileWorkspaces } from './typescript';
import { generateBundledModules } from './rollup';

process.chdir(path.resolve(__dirname, '..'));

console.log(`\nBuilding...\n`);

compileWorkspaces(async ({ currentPath, name }) => {
  await generateBundledModules({
    inputFile: path.resolve(currentPath, 'build/index.js'),
    outputFile: path.resolve(currentPath, 'dist/index.cjs.js'),
    format: 'cjs',
    name,
  });
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
});
