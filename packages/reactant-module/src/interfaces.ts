import { Store, PreloadedState, AnyAction, Middleware, Action } from 'redux';
import { storeKey, actionIdentifierKey } from './constants';

export { ModuleOptions } from 'reactant-di';

export type TypePreloadedState<T> = PreloadedState<T>;

export interface ServiceWithState<T = any> {
  state: Record<string, T>;
  name?: string;
  [storeKey]?: Store;
  [actionIdentifierKey]?: symbol;
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
