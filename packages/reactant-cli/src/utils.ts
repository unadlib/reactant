import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';
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

export const createFile = ({
  filePath,
  templatePath,
  templateType,
  file,
  projectRootPath,
}: Record<
  'filePath' | 'templatePath' | 'templateType' | 'file' | 'projectRootPath',
  string
>) => {
  if (fs.existsSync(filePath)) {
    console.error(chalk.red(`'${filePath}' file already exists.`));
    return;
  }
  let templateString = fs.readFileSync(templatePath, {
    encoding: 'utf8',
  });
  if (templateType === 'service') {
    templateString = templateString
      .replace(/TemplateService/g, `${file}Service`)
      .replace('./template.service', `./${file}.service`);
  }
  if (templateType === 'view') {
    templateString = templateString
      .replace(/TemplateView/g, `${file}View`)
      .replace('./template.view', `./${file}.view`);
  }
  fs.writeFileSync(filePath, templateString);
  const stats = fs.statSync(filePath);
  const relativePath = path.relative(projectRootPath, filePath);
  console.log(chalk.cyan('Create'), ` ${relativePath}  (${stats.size} bytes)`);
};
