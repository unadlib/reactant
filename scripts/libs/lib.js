import fs from 'fs';
import path from 'path';

export const getFileTree = sourceUrl => {
  const returnObj = [];
  const files = fs.existsSync(sourceUrl) ? fs.readdirSync(sourceUrl) : [];

  files.forEach(file => {
    const url = path.join(sourceUrl, file);

    if (fs.lstatSync(url).isDirectory()) {
      returnObj.push(...getFileTree(url));
    } else {
      returnObj.push(url);
    }
  });

  return returnObj;
};
