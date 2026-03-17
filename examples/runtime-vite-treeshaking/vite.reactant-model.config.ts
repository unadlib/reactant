import { createTreeshakingConfig } from './vite.base';

export default createTreeshakingConfig(
  './src/reactant-model.ts',
  './dist/reactant-model'
);
