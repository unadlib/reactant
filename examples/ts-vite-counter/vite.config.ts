import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ['@babel/plugin-proposal-decorators', { version: 'legacy' }],
          'babel-plugin-transform-typescript-metadata',
          [
            '@babel/plugin-transform-class-properties',
            {
              loose: true,
            },
          ],
        ],
      },
    }),
  ],
});
