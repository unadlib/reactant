import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    minify: false,
    sourcemap: false,
    target: 'es2020',
  },
});
