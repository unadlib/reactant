import { createTreeshakingConfig } from './vite.base';

export default createTreeshakingConfig(
  './src/reactant-di.ts',
  './dist/reactant-di'
);
