import fs from 'fs-extra';
import path from 'path';
import { spawn } from 'child_process';

process.chdir(path.resolve(__dirname, '..'));

const generateDocs = (project: string) => {
  const projectApiPath = path.resolve(`docs/api/${project}`);
  fs.removeSync(projectApiPath);
  const args = [
    '--out',
    projectApiPath,
    `packages/${project}/src/`,
    '--plugin',
    'typedoc-plugin-markdown',
    '--target',
    'ES5',
    '--module',
    'commonjs',
    '--readme',
    `packages/${project}/api`,
    '--excludeExternals',
  ];
  spawn('typedoc', args, {
    stdio: 'inherit',
  });
};

const projects = [
  'reactant-module',
  'reactant-di',
  'reactant-model',
  'reactant-redux',
  'reactant-router',
  'reactant-storage',
];

projects.forEach(generateDocs);
