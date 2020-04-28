/* eslint-disable no-console */
import { Command } from 'commander';
import { createInitCommand } from './init';
import { createInfoCommand } from './info';

export interface PackageJson {
  name?: string;
  version?: string;
}

// eslint-disable-next-line
const packageJson = require('../package.json');
const command = new Command();
command.usage('[command] [options]').version(packageJson.version);

createInitCommand(command as Command, packageJson);

createInfoCommand(command as Command, packageJson);

command.parse(process.argv);
