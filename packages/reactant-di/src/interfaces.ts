import { interfaces } from 'inversify';

export type ContainerOptions = interfaces.ContainerOptions;
export type Container = interfaces.Container;
export type ServiceIdentifier<T> = interfaces.ServiceIdentifier<T>;
export type ServiceIdentifiersMap<T = any> = Map<
  ServiceIdentifier<T>,
  ServiceIdentifier<T>[]
>;
