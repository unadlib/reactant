/* eslint-disable no-console */
import { Command } from 'commander';
import path from 'path';
import fs from 'fs-extra';
import { createInitCommand } from './init';
import { createInfoCommand } from './info';
import { createGenerateCommand } from './generate';

export interface PackageJson {
  name?: string;
  version?: string;
  dependencies?: Record<string, string>;
}

const packageJson = fs.readJsonSync(path.resolve(__dirname, '../package.json'));
const command = new Command() as Command;
command.usage('[command] [options]').version(packageJson.version);

createInitCommand(command, packageJson);

createGenerateCommand(command);

createInfoCommand(command, packageJson);

command.parse(process.argv);
