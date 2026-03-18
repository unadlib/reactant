import type { Service } from 'reactant-module';
import { stateKey } from 'reactant-module';

export const getRehydrated = (target: object): undefined | boolean => {
  const module: Service = target;
  const state = module[stateKey];
  return state?._persist?.rehydrated;
};
