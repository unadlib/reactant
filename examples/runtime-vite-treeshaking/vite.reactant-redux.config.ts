import { createTreeshakingConfig } from './vite.base';

export default createTreeshakingConfig(
  './src/reactant-redux.ts',
  './dist/reactant-redux'
);
