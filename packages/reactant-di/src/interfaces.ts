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

export interface ValueProvider<T = any> {
  provide: ServiceIdentifier<any>;
  useValue: T;
}

export interface ClassProvider<T = any> {
  provide: ServiceIdentifier<any>;
  useClass: Module<T>;
  deps?: (ServiceIdentifier<any> | Optional)[];
}

export interface ModuleProvider<T = any> {
  provide: Module<T>;
  deps?: (ServiceIdentifier<any> | Optional)[];
}

export interface FactoryProvider<T = any> {
  deps?: DependencyOption[];
  provide: ServiceIdentifier<any>;
  useFactory: (...args: any[]) => T;
}

export type ModuleOptions<T = any> =
  | ValueProvider<T>
  | FactoryProvider<T>
  | ClassProvider<T>
  | ModuleProvider<T>
  | Module<T>;

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
  /**
   *
   */
  name?: string;
  /**
   *
   */
  deps?: DependenciesModule[];
}
