import { createTreeshakingConfig } from './vite.base';

export default createTreeshakingConfig(
  './src/reactant-router-dom.ts',
  './dist/reactant-router-dom'
);
