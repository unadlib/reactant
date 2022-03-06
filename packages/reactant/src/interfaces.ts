/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ContainerOptions,
  ReactModuleOptions,
  TypePreloadedState,
  ReactantStore,
  DevOptions,
  Container,
} from 'reactant-module';
import type { ReactChild } from 'react';

export type Unmount = () => void;
export interface Config<T> {
  /**
   * As the main start-up module.
   */
  main: ReactModuleOptions<T>;
  /**
   * As a rendering function for any React renderer.
   */
  render: (element: ReactChild, ...args: any[]) => Unmount;
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
  preloadedState?: TypePreloadedState<unknown>;
  /**
   * Reactant's development setting options.
   */
  devOptions?: DevOptions;
}

export interface App<T> {
  instance: T;
  container: Container;
  store: ReactantStore | null;
  bootstrap(...args: unknown[]): Unmount;
}

export type ShallowEqual = (
  a: Record<string, any>,
  b: Record<string, any>
) => boolean;
