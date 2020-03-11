import { Store, PreloadedState, AnyAction, Middleware, Action } from 'redux';
import { storeKey } from './constants';
import { PluginModule } from './core';

export { ModuleOptions } from 'reactant-di';

export type TypePreloadedState<T> = PreloadedState<T>;

export interface State<T> {
  state?: Record<string, T>;
  name?: string;
}
export interface Service<T = any> extends State<T> {
  readonly [storeKey]?: Store;
}

export type ReactantStore = Store<any, AnyAction>;

export type ReactantMiddleware = Middleware;

export interface ReactantAction<T = any> extends Action<string | symbol> {
  state: Record<string, T>;
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

type Collection<T> = {
  [P in Exclude<keyof T, keyof Service>]-?: NonNullable<T[P]>[];
};

export type PluginHooks = Collection<PluginModule>;

export type HandlePlugin<T = any> = (
  service: T,
  pluginHooks: PluginHooks
) => void;
