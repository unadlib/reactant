import { interfaces } from 'inversify';

export type ContainerOptions = interfaces.ContainerOptions;
export type Container = interfaces.Container;
export type ServiceIdentifier<T> = interfaces.ServiceIdentifier<T>;
export type ServiceIdentifiersMap<T = any> = Map<
  ServiceIdentifier<T>,
  ServiceIdentifier<T>[]
>;

export interface Module<T> extends Function {
  new (...args: any[]): T;
}

export type ModuleToken = Module<any> | string | symbol;

export type ModuleOptions =
  | {
      provide: ModuleToken;
      useClass?: Module<any>;
      useValue?: any;
      deps: [];
    }
  | Module<any>;

export interface ContainerConfig {
  ServiceIdentifiers: ServiceIdentifiersMap;
  modules?: ModuleOptions[];
  options?: ContainerOptions;
};
