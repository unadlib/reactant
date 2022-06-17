import {
  ContainerOptions,
  ReactModuleOptions,
  TypePreloadedState,
  ReactantStore,
  DevOptions,
  Container,
} from 'reactant-module';

export type Renderer<T extends any[]> = (
  element: JSX.Element,
  ...args: T
) => any;

export interface Config<T, S extends any[], R extends Renderer<S>> {
  /**
   * As the main start-up module.
   */
  main: ReactModuleOptions<T>;
  /**
   * As a rendering function for any React renderer.
   */
  render: (element: JSX.Element, ...args: S) => ReturnType<R>;
  /**
   * Importing the injected dependency modules.
   */
  modules?: ReactModuleOptions[];
  /**
   * Dependent injection container options.
   */
  containerOptions?: ContainerOptions;
  /**
   * Preloaded state of shared state for Redux.
   */
  preloadedState?: TypePreloadedState<any>;
  /**
   * Reactant's development setting options.
   */
  devOptions?: DevOptions;
}

export interface App<T, S extends any[], R extends Renderer<S>> {
  instance: T;
  container: Container;
  store: ReactantStore | null;
  bootstrap(...args: S): ReturnType<R> | Promise<R>;
}

export type ShallowEqual = (
  a: Record<string, any>,
  b: Record<string, any>
) => boolean;
