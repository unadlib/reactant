import path from 'path';
import fs from 'fs-extra';
import { PackageJson } from './index';

export const detectIsRootPath = () => {
  const packageJsonPath = path.resolve(process.cwd(), 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson: PackageJson = fs.readJsonSync(packageJsonPath);
    return !!packageJson.dependencies?.reactant;
  }
  return false;
};
