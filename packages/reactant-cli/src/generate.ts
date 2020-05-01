/* eslint-disable no-console */
import { Command } from 'commander';
import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';
import { lookupRoot } from './utils';

const templateTypeMap = {
  s: 'service',
  service: 'service',
  v: 'view',
  view: 'view',
} as const;

const supportLanguageMap = {
  ts: 'typescript',
  typescript: 'typescript',
  js: 'javascript',
  javascript: 'javascript',
} as const;

const supportLanguages = Array.from(new Set(Object.values(supportLanguageMap)));

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
      `specify a file type(${supportLanguages.join('/')})`,
      supportLanguages[0]
    )
    .action(
      (
        type: keyof typeof templateTypeMap,
        {
          skipTests,
          language,
        }: { skipTests: boolean; language: keyof typeof supportLanguageMap },
        files: string[]
      ) => {
        // TODO: lookup root path.
        const currentPath = process.cwd();
        let projectRootPath = currentPath;
        try {
          projectRootPath = lookupRoot(currentPath);
        } catch (e) {
          console.log(
            chalk.red('The command requires to be run in an Reactant project: ')
          );
          console.log(currentPath);
          process.exit(1);
        }
        const isRootPath = projectRootPath === currentPath;
        if (typeof files === 'undefined') {
          console.error(chalk.red('The file name is required.'));
          process.exit(1);
        }
        const templateType = templateTypeMap[type];
        if (typeof templateType !== 'string') {
          console.error(
            chalk.red(
              `The template name should be ${Object.keys(templateTypeMap).join(
                ', '
              )}, not '${type}'.`
            )
          );
          process.exit(1);
        }

        const templateLanguage = supportLanguageMap[language];
        if (typeof templateLanguage !== 'string') {
          console.error(
            chalk.red(
              `The template language should be ${supportLanguages.join(
                ', '
              )}, not '${language}'.`
            )
          );
          process.exit(1);
        }

        const typeName = `${
          templateLanguage === supportLanguageMap.javascript ? 'js' : 'ts'
        }${templateType === 'view' ? 'x' : ''}`;
        const templateName = `template.${templateType}.${typeName}`;
        const templatePath = path.resolve(
          __dirname,
          `../templates/${templateType}/${templateName}`
        );
        // TODO: implement `skipTests`
        for (const file of files) {
          try {
            // eslint-disable-next-line no-eval
            eval(`var ${file};`);
          } catch (e) {
            console.error(chalk.red(`${file} is not a valid name.`));
            break;
          }
          const fileFullName = `${file}.${templateType}.${typeName}`;
          // TODO: customized default source path
          const projectRootDefaultSourcePath = path.join(
            projectRootPath,
            'src'
          );
          const filePath = path.join(
            isRootPath ? projectRootDefaultSourcePath : currentPath,
            fileFullName
          );
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
          const relativePath = path.relative(projectRootPath, filePath);
          console.log(
            chalk.cyan('Create'),
            ` ${relativePath}  (${stats.size} bytes)`
          );
        }
      }
    );
};
