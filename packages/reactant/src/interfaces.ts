import {
  ContainerOptions,
  ReactModuleOptions,
  TypePreloadedState,
  ReactantStore,
  DevOptions,
  Container,
} from 'reactant-module';

export interface Config<T> {
  /**
   * As the main start-up module.
   */
  main: ReactModuleOptions<T>;
  /**
   * As a rendering function for any React renderer.
   */
  render: (
    element: JSX.Element,
    ...args: any[]
  ) => Element | void | JSX.Element;
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

export interface App<T> {
  instance: T;
  container: Container;
  store: ReactantStore | null;
  bootstrap(
    ...args: unknown[]
  ): void | Element | JSX.Element | Promise<void | Element | JSX.Element>;
}

export type ShallowEqual = (
  a: Record<string, any>,
  b: Record<string, any>
) => boolean;
