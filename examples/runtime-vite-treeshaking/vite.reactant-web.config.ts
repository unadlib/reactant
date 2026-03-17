import { createTreeshakingConfig } from './vite.base';

export default createTreeshakingConfig(
  './src/reactant-web.ts',
  './dist/reactant-web'
);
