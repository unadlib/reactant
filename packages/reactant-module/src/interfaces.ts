import { Store, PreloadedState } from 'redux';
import { storeKey } from './constants';

export { ModuleOptions } from 'reactant-di';

export type TypePreloadedState<T> = PreloadedState<T>;

export interface ServiceWithState<T = any> {
  state: Record<string, T>;
  name: string;
  [storeKey]?: Store;
}

export type StateMapObject<T extends Record<string, Function>> = {
  [P in keyof T]: T[P] extends (...args: any[]) => any
    ? FirstParameter<T[P]>
    : never;
};

export type FirstParameter<T extends (...args: any) => any> = T extends (
  param: infer P,
  ...args: any[]
) => any
  ? P
  : never;
