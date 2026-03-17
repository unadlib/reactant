import { createTreeshakingConfig } from './vite.base';

export default createTreeshakingConfig(
  './src/reactant-storage.ts',
  './dist/reactant-storage'
);
