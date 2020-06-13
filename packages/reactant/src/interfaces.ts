import {
  ContainerOptions,
  ServiceIdentifier,
  ReactModuleOptions,
  TypePreloadedState,
  ReactantStore,
  DevOptions,
} from 'reactant-module';

export interface Config<T> {
  /**
   * As the main start-up module.
   */
  main: ServiceIdentifier<T>;
  /**
   * As a rendering function for any React renderer.
   */
  render: (element: JSX.Element, ...args: any[]) => Element | void;
  /**
   * Importing the injected dependency module.
   */
  modules?: ReactModuleOptions[];
  /**
   * Dependent injection container options
   */
  containerOptions?: ContainerOptions;
  /**
   * Preloaded state of shared state for Redux.
   */
  preloadedState?: TypePreloadedState<any>;
  /**
   * Reactant's development setting options
   */
  devOptions?: DevOptions;
}

export interface App<T> {
  instance: T;
  store: ReactantStore | null;
  bootstrap(...args: any[]): void | Element;
}

export type ShallowEqual = (
  a: Record<string, any>,
  b: Record<string, any>
) => boolean;
