import { Store } from 'redux';
import { storeKey } from './constants';

export interface Module<T> extends Function {
  new (...args: any[]): T;
}

export interface ServiceWithState<T = any> {
  state: Record<string, T>;
  name: string;
  [storeKey]?: Store;
}

export type ModuleToken = Module<any> | string | symbol;

export interface ModuleOptions {
  provide: ModuleToken;
  useClass?: Module<any>;
  // todo
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
