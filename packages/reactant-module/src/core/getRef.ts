import type { Store as ReduxStore } from 'redux';
import type { Container } from 'reactant-di';
import {
  identifierKey,
  modulesKey,
  storeKey,
  containerKey,
  stateKey,
  initStateKey,
  enablePatchesKey,
  enableAutoFreezeKey,
  strictKey,
  enableInspectorKey,
  checkActionKey,
} from '../constants';
import type { DevOptions, Service } from '../interfaces';

export interface Ref {
  readonly store?: ReduxStore;
  readonly modules?: Record<string, any>;
  readonly container?: Container;
  readonly identifier?: string;
  readonly state?: Record<string, any>;
  readonly initState?: Record<string, any>;
  readonly enablePatches?: boolean;
  readonly enableAutoFreeze?: boolean;
  readonly strict?: boolean;
  readonly enableInspector?: boolean;
  readonly checkAction?: DevOptions['checkAction'];
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
    get enablePatches() {
      return _instance[enablePatchesKey];
    },
    get enableAutoFreeze() {
      return _instance[enableAutoFreezeKey];
    },
    get strict() {
      return _instance[strictKey];
    },
    get enableInspector() {
      return _instance[enableInspectorKey];
    },
    get checkAction() {
      return _instance[checkActionKey];
    },
  };
};
