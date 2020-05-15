/* eslint-disable no-console */
import { spawn } from 'child_process';
import fs from 'fs-extra';
import path from 'path';

const projects = [
  'reactant-module',
  'reactant-di',
  'reactant-model',
  'reactant-redux',
  'reactant-router',
  'reactant-storage',
  'reactant',
];

process.chdir(path.resolve(__dirname, '..'));

const generateDocs = (project: string) => {
  return new Promise(resolve => {
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
      `packages/${project}/README.md`,
      '--excludeExternals',
      '--theme',
      'docusaurus',
      '--hideBreadcrumbs',
      '--skipSidebar',
      '--readme',
      'none',
    ];
    const subprocess = spawn('typedoc', args, {
      stdio: 'inherit',
    });
    subprocess.on('close', code => {
      resolve();
    });
  });
};

const changeAlias = () => {
  const apiAliasPath = path.resolve(process.cwd(), 'website/apiAlias.json');
  if (fs.existsSync(apiAliasPath)) {
    const apiAlias = fs.readJsonSync(apiAliasPath);
    Object.entries(apiAlias).forEach(([docPath, alias], key) => {
      const apiDocPath = path.resolve(process.cwd(), 'docs', `${docPath}.md`);
      if (fs.existsSync(apiDocPath)) {
        let apiDoc = fs.readFileSync(apiDocPath, {
          encoding: 'utf8',
        });
        apiDoc = apiDoc
          .replace(/title:\s"[\w/]+"/, `title: "${alias}"`)
          .replace(/sidebar_label:\s"[\w/]+"/, `sidebar_label: "${alias}"`);
        fs.writeFileSync(apiDocPath, apiDoc);
      }
    });
  }
};

const buildDocs = async () => {
  await Promise.all(projects.map(generateDocs));
  changeAlias();
};

buildDocs();
