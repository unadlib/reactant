/* eslint-disable no-console */
import chalk from 'chalk';
import { Command } from 'commander';
import { generateProject } from 'installation';

import { PackageJson } from '.';

export const supportLanguageMap = {
  ts: 'typescript',
  typescript: 'typescript',
  js: 'javascript',
  javascript: 'javascript',
} as const;

export const supportLanguages = Array.from(
  new Set(Object.values(supportLanguageMap))
);

interface Options {
  verbose: boolean;
  native: boolean;
  language: keyof typeof supportLanguageMap;
  useNpm: boolean;
  usePnp: boolean;
}

export const createInitCommand = (
  command: Command,
  packageJson: PackageJson
) => {
  const [appType] = packageJson.name
    ?.replace(/^./, i => i.toUpperCase())
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
      '-n, --native',
      `create a ${appType} project for react-native`,
      false
    )
    .option('-v, --verbose', 'print verbose logs', false)
    .option('--use-npm', 'use npm for the package manager', false)
    .option('--use-pnp', 'use yarn PnP feature', false)
    .action(
      (projectName, { verbose, native, language, useNpm, usePnp }: Options) => {
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
        const type = native ? 'native' : 'web';
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
