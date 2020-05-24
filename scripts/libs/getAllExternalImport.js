import { readFileSync } from 'fs';

import { getFileTree } from './lib';

export function getAllExternalImport(dir) {
  const externalRegex = /(import|export) .*('(?!\.).*')/g;

  const external = new Set();

  let filePaths = [];

  if (dir instanceof Array) {
    dir.forEach(d => {
      filePaths = filePaths.concat(getFileTree(d));
    });
  } else {
    filePaths = filePaths.concat(getFileTree(dir));
  }

  filePaths.forEach(filePath => {
    if (
      /\.ts|\.tsx/g.test(filePath) &&
      !/\.spec\.|\.test\.|\.story\.ts|\.story\.tsx/g.test(filePath)
    ) {
      const template = readFileSync(filePath).toString();
      const match = template.match(externalRegex);

      if (match && match.length > 0) {
        match.forEach(item =>
          external.add(item.match(/'(?!\.).*'/g)[0].replace(/'/g, ''))
        );
      }
    }
  });

  return [...external];
}
