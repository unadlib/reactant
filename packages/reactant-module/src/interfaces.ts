/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-use-before-define */
import type {
  Store as ReduxStore,
  PreloadedState,
  AnyAction,
  Middleware,
  Action,
  Unsubscribe,
  ReducersMapObject,
} from 'redux';
import type { Patch as IPatch, Patches as IPatches } from 'mutative';
import type { EnhancerOptions } from 'redux-devtools-extension';
import type {
  Container,
  ModuleOptions,
  ModuleDecoratorOptions as IModuleDecoratorOptions,
} from 'reactant-di';
import {
  storeKey,
  subscriptionsKey,
  stateKey,
  defaultStateKey,
  actionIdentifier,
  loaderKey,
  enablePatchesKey,
  enableAutoFreezeKey,
  containerKey,
  identifierKey,
  nameKey,
  modulesKey,
  initStateKey,
  unsubscriptionsKey,
  enableInspectorKey,
  strictKey,
  enableAutoComputedKey,
  signalMapKey,
  checkActionKey,
} from './constants';
import { PluginModule, Ref } from './core';
import type { Signal } from './core/signal';

export type Patch = IPatch<true>;

export type Patches = IPatches<true>;

export interface DevOptions {
  /**
   * Enable strict mode for React and Mutative.
   */
  strict?: boolean;
  /**
   * Enable state update patches.
   */
  enablePatches?: boolean;
  /**
   * Enable inspector for state changing.
   */
  enableInspector?: boolean;
  /**
   * Enable state auto freeze.
   */
  autoFreeze?: boolean;
  /**
   * Enable auto computed.
   */
  autoComputed?: boolean;
  /**
   * Enable redux dev tools.
   */
  reduxDevTools?: boolean;
  /**
   * Redux dev tools enhancer options.
   */
  reduxDevToolsOptions?: ReduxDevToolsOptions;
  /**
   * Check action method.
   */
  checkAction?: (options: {
    target: Service;
    ref: Ref;
    method: string;
    args: any[];
  }) => void;
}

export type ReduxDevToolsOptions = Pick<
  EnhancerOptions,
  Exclude<keyof EnhancerOptions, 'actionSanitizer' | 'serialize'>
>;

export type TypePreloadedState<T> = PreloadedState<T>;

export type Subscriptions = (() => void)[];

export interface Service<T extends Record<string, any> = Record<string, any>> {
  readonly [stateKey]?: T;
  readonly [defaultStateKey]?: T;
  readonly [storeKey]?: ReduxStore;
  readonly [signalMapKey]?: Record<string, Signal<unknown>>;
  readonly [loaderKey]?: Loader;
  readonly [enablePatchesKey]?: boolean;
  readonly [enableAutoComputedKey]?: boolean;
  readonly [enableAutoFreezeKey]?: boolean;
  readonly [strictKey]?: boolean;
  readonly [enableInspectorKey]?: boolean;
  readonly [subscriptionsKey]?: Subscriptions;
  readonly [unsubscriptionsKey]?: Set<Unsubscribe>;
  readonly [containerKey]?: Container;
  readonly [modulesKey]?: Record<string, any>;
  readonly [initStateKey]?: Record<string, any>;
  readonly [checkActionKey]?: DevOptions['checkAction'];
  [identifierKey]?: string;
  [nameKey]?: string;
}

export type ThisService = Service & { [P: string]: any };

export type ReactantModuleOptions<T = any> = ModuleOptions<T>;

export type ReactantStore = ReduxStore<any, AnyAction> & {
  reducers?: ReducersMapObject;
};

export type ReactantMiddleware = Middleware;

export interface ReactantAction<T = any> extends Action<string | symbol> {
  method?: string;
  state: Record<string, T>;
  params: any[];
  _reactant: typeof actionIdentifier;
  _patches?: Patches;
  _inversePatches?: Patches;
}

export type StateMapObject<T extends Record<string, Function>> = {
  [P in keyof T]: T[P] extends (...args: any[]) => any
    ? FirstParameter<T[P]>
    : never;
};

export type ModulesMap = Record<string, any>;

export type FirstParameter<T extends (...args: any) => any> = T extends (
  param: infer P,
  ...args: any[]
) => any
  ? P
  : never;

type Collection<T> = {
  [P in Exclude<keyof T, keyof Service | typeof storeKey>]-?: NonNullable<
    T[P]
  >[];
};

export type PluginHooks = Collection<PluginModule>;

export type HandlePlugin<T = any> = (
  service: T,
  pluginHooks: PluginHooks,
  index?: number
) => void;

export type Subscribe = (
  /**
   * Module instance
   */
  service: ThisService,
  /**
   * Redux's store subscription
   */
  listener: () => void,
  /**
   * Redux's options subscription
   */
  options?: {
    /**
     * Whether to trigger the listener immediately
     */
    immediate?: boolean;
  }
) => Unsubscribe;

type Selector<T> = () => T;

type Watcher<T> = (newValue: T, oldValue: T) => void;

export type Watch = <P extends boolean, T extends P extends true ? any[] : any>(
  /**
   * Module instance
   */
  service: ThisService,
  /**
   * Watched values
   */
  selector: Selector<P extends true ? readonly [...T] | [...T] : T>,
  /**
   * Watch callback with value changes
   */
  watcher: Watcher<T>,
  /**
   * Watch options
   */
  options?: {
    /**
     * Use multiple values watching
     */
    multiple?: P;
    /**
     * Define `isEqual` function as shallow comparison
     */
    isEqual?: (x: unknown, y: unknown) => boolean;
  }
) => Unsubscribe;

export interface LoadOptions<T> {
  modules?: ReactantModuleOptions[];
  main: ReactantModuleOptions<T>;
}

export type Loader = (
  loadModules: ReactantModuleOptions[],
  beforeReplaceReducer?: (container: Container) => void
) => void;

export type Load = (
  service: ThisService,
  loadModules: ReactantModuleOptions[]
) => Promise<Container>;

export type StateService<T extends Record<string, any>> = Service<T>;

export interface ModuleDecoratorOptions extends IModuleDecoratorOptions {
  /**
   * string identifier of the current module, which is used for module word maps indexed by strings such as reducers and proxies.
   */
  name?: string;
}

export interface PropertyDescriptor<T> extends TypedPropertyDescriptor<T> {
  initializer(): T;
}

export type PartialRequired<T, K extends keyof T> = Required<Pick<T, K>> &
  Pick<T, Exclude<keyof T, K>>;

type OptionalKeyOf<T> = Exclude<
  {
    [K in keyof T]: T extends Record<K, T[K]> ? never : K;
  }[keyof T],
  undefined
>;

type ExcludeRequired<T> = {
  [K in keyof T]-?: T extends Record<K, T[K]> ? never : T[K];
};

export type PickOptional<T> = Pick<ExcludeRequired<T>, OptionalKeyOf<T>>;

export type PartialKeys<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> &
  Partial<Pick<T, K>>;

/**
 * It's used to infer the type of `import()` type
 *
 * @example
 * // counter.ts: `export const list = [''];`
 * type List = ImportType<typeof import('./counter'), 'list'>;
 */
export type ImportType<T, K extends keyof T> = T extends Record<K, infer R>
  ? R
  : never;

/**
 * It's used to infer the type of `import()` class type
 * or use `import type` in TypeScript 3.8+
 *
 * @example
 * // counter.ts: `export class Counter {}`
 * type Counter = ImportClass<typeof import('./counter'), 'Counter'>;
 */
export type ImportClass<T, K extends keyof T> = T extends Record<K, infer S>
  ? S extends new (...args: any[]) => infer R
    ? R
    : never
  : never;
export type Store = ReduxStore;

export type DynamicModules = Map<any, { multiple: boolean; value: any }>;
