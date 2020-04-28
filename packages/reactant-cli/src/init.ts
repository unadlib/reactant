/* eslint-disable no-console */
import { Command } from 'commander';
import chalk from 'chalk';
import { generateProject } from 'installation';
import { PackageJson } from './index';

export const createInitCommand = (
  command: Command,
  packageJson: PackageJson
) => {
  command
    .command('init')
    .arguments('<project-directory>')
    .usage('<project-directory> [options]')
    .option(
      '-l, --language <language>',
      `specify a development of language for the created project`
    )
    .option(
      '-t, --type <type>',
      `specify a ${packageJson.name} project of type for the created project`
    )
    .option('-v, --verbose', 'print verbose logs')
    .option('--use-npm')
    .option('--use-pnp')
    .action(
      (
        projectName,
        {
          verbose = false,
          type = 'web',
          language = 'typescript',
          useNpm,
          usePnp,
        }: Command
      ) => {
        generateProject({
          name: projectName,
          verbose,
          type,
          language,
          useNpm,
          usePnp,
          appType: 'Reactant',
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
