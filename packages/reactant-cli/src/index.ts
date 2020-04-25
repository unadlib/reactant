import { Command } from 'commander';
// import { checkNodeVersion } from 'installation';
// checkNodeVersion();

const program = new Command();
console.log(require('../package.json').version);
