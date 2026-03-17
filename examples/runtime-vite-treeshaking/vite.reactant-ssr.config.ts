import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';
import { createTreeshakingConfig } from './vite.base';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default mergeConfig(
  createTreeshakingConfig('./src/reactant-ssr.ts', './dist/reactant-ssr'),
  {
    resolve: {
      alias: {
        'next/app': path.resolve(rootDir, './stubs/next-app.ts'),
      },
    },
  }
);
