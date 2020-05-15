import fs from 'fs-extra';
import globParent from 'glob-parent';
import loadJsonFile from 'load-json-file';
import path from 'path';

export type Package = {
  workspaces: string[];
  private: boolean;
  name: string;
  bin?: Record<string, string>;
};

export type Handler = (
  packageParentDir: string,
  packageChildDir: string
) => Promise<void>;

export const handleWorkspaces = async (handler: Handler) => {
  const { workspaces } = loadJsonFile.sync<Package>(
    path.resolve('package.json')
  );
  for (const pattern of workspaces) {
    const packageParentDir = path.resolve(globParent(pattern));
    const packageChildDirs = fs.readdirSync(packageParentDir);
    for (const packageChildDir of packageChildDirs) {
      await handler(packageParentDir, packageChildDir);
    }
  }
};
