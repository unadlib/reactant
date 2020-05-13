import {
  ContainerOptions,
  ServiceIdentifier,
  ReactModuleOptions,
  TypePreloadedState,
  ReactantStore,
  ReactantMiddleware,
  DevOptions,
} from 'reactant-module';

export interface Config<T> {
  main: ServiceIdentifier<T>;
  render?: (element: JSX.Element, ...args: any[]) => Element | void;
  modules?: ReactModuleOptions[];
  containerOptions?: ContainerOptions;
  middlewares?: ReactantMiddleware[];
  preloadedState?: TypePreloadedState<any>;
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
