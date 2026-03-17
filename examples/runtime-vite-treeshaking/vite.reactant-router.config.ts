import { createTreeshakingConfig } from './vite.base';

export default createTreeshakingConfig(
  './src/reactant-router.ts',
  './dist/reactant-router'
);
