import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export const createTreeshakingConfig = (entryFile: string, outDir: string) =>
  defineConfig({
    build: {
      outDir,
      minify: false,
      sourcemap: false,
      target: 'es2020',
      lib: {
        entry: path.resolve(rootDir, entryFile),
        formats: ['es'],
      },
      rollupOptions: {
        output: {
          entryFileNames: 'index.js',
          chunkFileNames: 'chunks/[name].js',
        },
      },
    },
  });
