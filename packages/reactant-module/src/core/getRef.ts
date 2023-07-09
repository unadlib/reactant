import type { Store as ReduxStore } from 'redux';
import type { Container } from 'reactant-di';
import {
  identifierKey,
  modulesKey,
  storeKey,
  containerKey,
  stateKey,
  initStateKey,
} from '../constants';
import type { Service } from '../interfaces';

export interface Ref {
  readonly store?: ReduxStore;
  readonly modules?: Record<string, any>;
  readonly container?: Container;
  readonly identifier?: string;
  readonly state?: Record<string, any>;
  readonly initState?: Record<string, any>;
}

/**
 * Get the reference of the module instance.
 */
export const getRef = (instance: object): Ref => {
  const _instance = instance as Service;
  return {
    get modules() {
      return _instance[modulesKey];
    },
    get identifier() {
      return _instance[identifierKey];
    },
    get store() {
      return _instance[storeKey];
    },
    get container() {
      return _instance[containerKey];
    },
    get state() {
      return _instance[stateKey];
    },
    get initState() {
      return _instance[initStateKey];
    },
  };
};
