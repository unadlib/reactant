import { interfaces, LazyServiceIdentifer } from 'inversify';

import { METADATA_KEY } from './constants';
import { Optional } from './optional';

type PickByKey<T, P extends keyof T> = {
  [K in Exclude<keyof T, P>]: T[K];
};

export type ContainerOptions = PickByKey<
  interfaces.ContainerOptions,
  'skipBaseClassChecks'
>;
export type Container = interfaces.Container;
export type ServiceIdentifier<T> = interfaces.ServiceIdentifier<T>;
export type ServiceIdentifierOrFunc<T> =
  | ServiceIdentifier<T>
  | LazyServiceIdentifer;

export type ServiceIdentifiersMap<T = any> = Map<
  ServiceIdentifier<T>,
  ServiceIdentifier<T>[]
>;

export type MetadataMap = Map<ServiceIdentifier<any>, Module<any>>;

export interface Module<T> extends Function {
  new (...args: any[]): T;
}

export interface DependencyProviderOption {
  provide: ServiceIdentifier<any>;
  optional: boolean;
}

export type DependencyOption =
  | DependencyProviderOption
  | ServiceIdentifier<any>;

export interface ValueProvider {
  provide: ServiceIdentifier<any>;
  useValue: any;
}

export interface ClassProvider {
  provide: ServiceIdentifier<any>;
  useClass: Module<any>;
  deps?: (ServiceIdentifier<any> | Optional)[];
}

export interface ModuleProvider {
  provide: Module<any>;
  deps?: (ServiceIdentifier<any> | Optional)[];
}

export interface FactoryProvider {
  deps?: DependencyOption[];
  provide: ServiceIdentifier<any>;
  useFactory: (...args: any[]) => any;
}

export type ModuleOptions =
  | ValueProvider
  | FactoryProvider
  | ClassProvider
  | ModuleProvider
  | Module<any>;

export interface ContainerConfig {
  ServiceIdentifiers: ServiceIdentifiersMap;
  modules?: ModuleOptions[];
  options?: interfaces.ContainerOptions;
}

type ValueType<T> = T extends Record<number | string, infer R> ? R : never;

export type MetaDataKey = ValueType<typeof METADATA_KEY>;

interface DependenciesProvider {
  provide: ServiceIdentifier<any> | Module<any>;
  optional?: boolean;
  multi?: boolean;
}

type DependenciesModule = Module<any> | DependenciesProvider;

export interface ModuleDecoratorOptions {
  deps?: DependenciesModule[];
}
