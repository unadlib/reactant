import path from 'path';
import loadJsonFile from 'load-json-file';
import globParent from 'glob-parent';
import fs from 'fs-extra';
import ts from 'typescript';

type Package = {
  workspaces: string[];
  private: boolean;
  name: string;
};

type CompileOption = {
  currentPath: string;
  target?: number;
  module?: number;
  outDir?: string;
  declarationDir?: string;
  inputFile?: string;
};

const defaultOutDir = 'build';
const defaultDeclarationDir = 'dist';
const defaultInputFile = 'src/index.ts';

const compileTypeScript = ({
  currentPath,
  target,
  module,
  outDir = path.resolve(currentPath, defaultOutDir),
  declarationDir = path.resolve(currentPath, defaultDeclarationDir),
  inputFile = path.resolve(currentPath, defaultInputFile),
}: CompileOption) => {
  fs.removeSync(declarationDir);
  fs.removeSync(outDir);

  console.log(`Compiling TypeScript:\n-> ${outDir}`);

  const tsConfig = path.resolve('tsconfig.json');
  const json = ts.parseConfigFileTextToJson(
    tsConfig,
    ts.sys.readFile(tsConfig)!
  );
  const { options } = ts.parseJsonConfigFileContent(
    json.config,
    ts.sys,
    path.dirname(tsConfig)
  );
  options.target = target || options.module;
  options.module = module || options.module;
  options.outDir = outDir;
  options.declaration = true;
  options.declarationDir = declarationDir;

  const compilerHost = ts.createCompilerHost(options, true);
  const program = ts.createProgram([inputFile], options, compilerHost);
  const result = program.emit();
  if (result.emitSkipped) {
    const message = result.diagnostics
      .map(
        diagnostic =>
          `${ts.DiagnosticCategory[diagnostic.category]} ${diagnostic.code} (${
            diagnostic.file
          }:${diagnostic.start}): ${diagnostic.messageText}`
      )
      .join('\n');
    console.error(`Failed to compile Typescript:\n\n${message}`);
  }
  console.log(`Succeed to compile Typescript.\n`);
};

const getCamelCase = (name: string) => {
  return name.replace(/-(\w)/g, (_, str) => str.toUpperCase());
};

type Generate = (option: {
  currentPath: string;
  name: string;
}) => Promise<void>;

const compileWorkspaces = async (generate: Generate) => {
  // TODO concurrency
  const { workspaces } = loadJsonFile.sync<Package>(
    path.resolve('package.json')
  );
  for (const pattern of workspaces) {
    const packageParentDir = path.resolve(globParent(pattern));
    const packageChildDirs = fs.readdirSync(packageParentDir);
    for (const packageChildDir of packageChildDirs) {
      const packageChildPath = path.resolve(packageParentDir, packageChildDir);
      const packageJsonPath = path.resolve(packageChildPath, 'package.json');
      try {
        const packageJson = loadJsonFile.sync<Package>(packageJsonPath);
        if (!packageJson.private) {
          compileTypeScript({
            currentPath: packageChildPath,
            target: ts.ScriptTarget.ES2015,
            module: ts.ModuleKind.ES2015,
            outDir: path.resolve(packageChildPath, defaultOutDir),
          });
          await generate({
            currentPath: packageChildPath,
            name: getCamelCase(packageJson.name),
          });
        }
      } catch (e) {
        // console.error('Loaded child package.json file error.');
      }
    }
  }
};

export { compileTypeScript, compileWorkspaces };
