/* eslint-disable no-console */
import { Command } from 'commander';

import { createGenerateCommand } from './generate';
import { createInfoCommand } from './info';
import { createInitCommand } from './init';

export interface PackageJson {
  name?: string;
  version?: string;
  dependencies?: Record<string, string>;
}

// eslint-disable-next-line
const packageJson = require('../package.json');
const command = new Command();
command.usage('[command] [options]').version(packageJson.version);

createInitCommand(command as Command, packageJson);

createGenerateCommand(command as Command);

createInfoCommand(command as Command, packageJson);

command.parse(process.argv);
