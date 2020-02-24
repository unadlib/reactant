import { Store } from 'redux';
import { storeKey } from './core/createStore';

export interface Module<T> extends Function {
  new (...args: any[]): T;
}

export interface Service<T = any> {
  state: Record<string, T>;
  name: string;
  [storeKey]?: Store;
}

export type ModuleToken = Module<any> | string | symbol;

export interface ModuleOptions {
  provide: ModuleToken;
  useClass?: Module<any>;
}
