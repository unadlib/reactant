/* eslint-disable no-console */
import { Command } from 'commander';
import chalk from 'chalk';
import { generateProject } from 'installation';
import { PackageJson } from './index';

export const supportLanguageMap = {
  ts: 'typescript',
  typescript: 'typescript',
  js: 'javascript',
  javascript: 'javascript',
} as const;

export const supportLanguages = Array.from(
  new Set(Object.values(supportLanguageMap))
);

// TODO: copy yarn.lock?
export const createInitCommand = (
  command: Command,
  packageJson: PackageJson
) => {
  command
    .command('init')
    .alias('i')
    .arguments('<project-directory>')
    .usage('<project-directory> [options]')
    .description('create a Reactant project')
    .option(
      '-l, --language <language>',
      `specify a development language(${supportLanguages.join('/')})`,
      supportLanguageMap.typescript
    )
    .option('-t, --type <type>', `specify a project type(web/native)`, 'web')
    .option('-v, --verbose', 'print verbose logs', false)
    .option('--use-npm', 'use npm for the package manager', false)
    .option('--use-pnp', 'use yarn PnP feature', false)
    .action(
      (projectName, { verbose, type, language, useNpm, usePnp }: Command) => {
        generateProject({
          name: projectName,
          verbose,
          type,
          language,
          useNpm,
          usePnp,
          appType: chalk.cyan('Reactant'),
          checkAppNames: [
            'react',
            'react-dom',
            'reactant',
            'reactant-web',
            'reactant-native',
          ],
          templatePackageName: 'reactant-template',
        });
      }
    );
};
