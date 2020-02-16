import 'reflect-metadata';
import { interfaces, optional, inject } from 'inversify';

export * from './createContainer';
export * from './injectable';
export * from './util';
export type ContainerOptions = interfaces.ContainerOptions;
export type ServiceIdentifier<T> = interfaces.ServiceIdentifier<T>;
export { optional, inject };
