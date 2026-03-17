import { createTreeshakingConfig } from './vite.base';

export default createTreeshakingConfig(
  './src/reactant-last-action.ts',
  './dist/reactant-last-action'
);
