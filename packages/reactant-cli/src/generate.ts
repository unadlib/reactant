/* eslint-disable no-console */
import { Command } from 'commander';
import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';

export const createGenerateCommand = (command: Command) => {
  command
    .command('generate')
    .alias('g')
    .description('generate the specified template file')
    .arguments('<template-type>')
    .usage('<template-type> [file-name] [options]')
    .option('-s, --skipTests', 'skip creating test files', true)
    .option(
      '-l, --language <language>',
      'specify a file type(javascript/typescript)',
      'typescript'
    )
    .action((templateType, { skipTests, language }, files) => {
      if (typeof files === 'undefined') {
        console.error(chalk.red('The file name is required.'));
        process.exit(1);
      }
      if (!['service', 'view'].includes(templateType)) {
        console.error(
          chalk.red(
            `The template name should be 'service' or 'view', not '${templateType}'.`
          )
        );
        process.exit(1);
      }
      const typeName = `${language === 'javascript' ? 'js' : 'ts'}${
        templateType === 'view' ? 'x' : ''
      }`;
      const templateName = `template.${templateType}.${typeName}`;
      const templatePath = path.resolve(
        __dirname,
        `../templates/${templateType}/${templateName}`
      );
      // TODO: `skipTests`
      for (const file of files) {
        try {
          // eslint-disable-next-line no-eval
          eval(`var ${file};`);
        } catch (e) {
          console.error(chalk.red(`${file} is not a valid name.`));
          break;
        }
        const fileFullName = `${file}.${templateType}.${typeName}`;
        const filePath = path.join(process.cwd(), fileFullName);
        if (fs.existsSync(filePath)) {
          console.error(chalk.red(`'${filePath}' file already exists.`));
          process.exit(1);
        }
        let templateString = fs.readFileSync(templatePath, {
          encoding: 'utf8',
        });
        if (templateType === 'service') {
          templateString = templateString.replace(
            /TemplateService/g,
            `${file}Service`
          );
        }
        if (templateType === 'view') {
          templateString = templateString.replace(
            /TemplateView/g,
            `${file}View`
          );
        }
        fs.writeFileSync(filePath, templateString);
        const stats = fs.statSync(filePath);
        console.log(
          chalk.cyan('Create'),
          ` ${fileFullName}  (${stats.size} bytes)`
        );
      }
    });
};
