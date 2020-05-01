import path from 'path';
import fs from 'fs-extra';
import { PackageJson } from './index';

export const detectIsRootPath = (currentPath: string) => {
  const packageJsonPath = path.resolve(currentPath, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson: PackageJson = fs.readJsonSync(packageJsonPath);
    return !!packageJson.dependencies?.reactant;
  }
  return false;
};

export const lookupRoot = (currentPath: string): string => {
  if (currentPath === '' || currentPath === '/') {
    throw new Error('There are no Reactant projects');
  }
  if (!detectIsRootPath(currentPath)) {
    return lookupRoot(path.resolve(currentPath, '..'));
  }
  return currentPath;
};
