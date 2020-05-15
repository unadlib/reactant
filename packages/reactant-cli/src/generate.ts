/* eslint-disable no-console */
import chalk from 'chalk';
import { Command } from 'commander';
import path from 'path';

import { supportLanguageMap, supportLanguages } from './init';
import { createFile, lookupRoot } from './utils';

const templateTypeMap = {
  s: 'service',
  service: 'service',
  v: 'view',
  view: 'view',
} as const;

interface Options {
  withTests: boolean;
  language: keyof typeof supportLanguageMap;
  src: string;
}

export const createGenerateCommand = (command: Command) => {
  command
    .command('generate')
    .alias('g')
    .description('generate the specified template file')
    .arguments('<template-type>')
    .usage('<template-type> [file-name] [options]')
    .option('-w, --withTests', 'creating test files', false)
    .option('-s, --src <src>', 'specify source files path', 'src')
    .option(
      '-l, --language <language>',
      `specify a file type(${supportLanguages.join('/')})`,
      supportLanguageMap.typescript
    )
    .action(
      (
        type: keyof typeof templateTypeMap,
        { withTests, language, src }: Options,
        files: string[]
      ) => {
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

        const suffix = `${
          templateLanguage === supportLanguageMap.javascript ? 'js' : 'ts'
        }${templateType === 'view' ? 'x' : ''}`;
        const templateName = `template.${templateType}.${suffix}`;
        const templatePath = path.resolve(
          __dirname,
          `../templates/${templateType}/${templateName}`
        );
        const templateTestName = `template.${templateType}.spec.${suffix}`;
        const templateTestPath = path.resolve(
          __dirname,
          `../templates/${templateType}/${templateTestName}`
        );
        for (const file of files) {
          try {
            // eslint-disable-next-line no-eval
            eval(`var ${file};`);
          } catch (e) {
            console.error(chalk.red(`${file} is not a valid name.`));
            break;
          }
          const fileFullName = `${file}.${templateType}.${suffix}`;
          const projectRootDefaultSourcePath = path.join(projectRootPath, src);
          const filePath = path.join(
            isRootPath ? projectRootDefaultSourcePath : currentPath,
            fileFullName
          );
          createFile({
            filePath,
            templatePath,
            templateType,
            file,
            projectRootPath,
          });
          if (withTests) {
            const fileTestFullName = `${file}.${templateType}.spec.${suffix}`;
            const fileTestPath = path.join(
              isRootPath ? projectRootDefaultSourcePath : currentPath,
              fileTestFullName
            );
            createFile({
              filePath: fileTestPath,
              templatePath: templateTestPath,
              templateType,
              file,
              projectRootPath,
            });
          }
        }
      }
    );
};
