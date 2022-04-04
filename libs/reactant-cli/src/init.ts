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

export const supportTypeMap = {
  native: 'native',
  web: 'web',
  'shared-tab': 'shared-tab',
  'shared-worker': 'shared-worker',
  'service-worker': 'service-worker',
} as const;

export const supportLanguages = Array.from(
  new Set(Object.values(supportLanguageMap))
);

interface Options {
  verbose: boolean;
  type: keyof typeof supportTypeMap;
  language: keyof typeof supportLanguageMap;
  useNpm: boolean;
  usePnp: boolean;
}

export const createInitCommand = (
  command: Command,
  packageJson: PackageJson
) => {
  const [appType] = packageJson!
    .name!.replace(/^./, (i) => i.toUpperCase())
    .split('-');
  command
    .command('init')
    .alias('i')
    .arguments('<project-directory>')
    .usage('<project-directory> [options]')
    .description(`create a ${appType} project`)
    .option(
      '-l, --language <language>',
      `specify a development language(${supportLanguages.join('/')})`,
      supportLanguageMap.typescript
    )
    .option(
      '-t, --type <type>',
      `create a ${appType} project`,
      supportTypeMap.web
    )
    .option('-v, --verbose', 'print verbose logs', false)
    .option('--use-npm', 'use npm for the package manager', false)
    .option('--use-pnp', 'use yarn PnP feature', false)
    .action(
      (projectName, { verbose, type, language, useNpm, usePnp }: Options) => {
        const native = type === 'native';
        if (native) {
          console.log(
            chalk.red(
              `Currently, reactant-cli does not support initializing a react-native project.`
            )
          );
          process.exit(1);
        }
        if (typeof supportTypeMap[type] === 'undefined') {
          console.log(
            chalk.red(
              `The type ${type} is invalid, '--type' or '-t' supports only ${Object.keys(
                supportTypeMap
              ).join(', ')}.`
            )
          );
          process.exit(1);
        }
        if (typeof supportLanguageMap[language] === 'undefined') {
          console.log(
            chalk.red(
              `The language ${language} is invalid, '--language' or '-l' supports only ${Object.keys(
                supportLanguageMap
              ).join(', ')}.`
            )
          );
          process.exit(1);
        }
        generateProject({
          name: projectName,
          verbose,
          type,
          language: supportLanguageMap[language],
          useNpm,
          usePnp,
          appType: chalk.cyan(appType),
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
