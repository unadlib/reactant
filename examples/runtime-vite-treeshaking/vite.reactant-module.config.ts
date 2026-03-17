import { createTreeshakingConfig } from './vite.base';

export default createTreeshakingConfig(
  './src/reactant-module.ts',
  './dist/reactant-module'
);
