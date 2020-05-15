/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import envInfo from 'envinfo';
import chalk from 'chalk';
import { Command } from 'commander';

import { PackageJson } from '.';

export const createInfoCommand = (
  command: Command,
  packageJson: PackageJson
) => {
  command
    .command('info')
    .description('collect debugging information')
    .action(() => {
      console.log(chalk.bold('\nEnvironment Information:\n'));
      console.log(
        `  Current version of ${packageJson.name}: ${packageJson.version}`
      );
      console.log(`  Execution path: ${__dirname}`);
      return envInfo
        .run(
          {
            System: ['OS', 'CPU'],
            Binaries: ['Node', 'npm', 'Yarn'],
            Browsers: [
              'Chrome',
              'Edge',
              'Internet Explorer',
              'Firefox',
              'Safari',
            ],
            npmPackages: [
              'react',
              'react-dom',
              'reactant',
              'reactant-web',
              'reactant-native',
              'reactant-cli',
            ],
            npmGlobalPackages: ['reactant-cli'],
          },
          {
            duplicates: true,
            showNotFound: true,
          }
        )
        .then(console.log);
    });
};
