import 'reflect-metadata';

export { createContainer, bindModules } from './createContainer';
export {
  inject,
  optional,
  injectable,
  multiInject,
  multiOptional,
  getLazyDecorator,
} from './decorators/index'; // Don't do `export * from './decorators`.
export { Optional } from './optional';
export { forwardRef } from './forwardRef';
export { ModuleRef } from './moduleRef';
export * from './interfaces';
