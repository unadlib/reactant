export { applyPatches } from 'immer';
export {
  inject,
  optional,
  multiInject,
  multiOptional,
  getLazyDecorator,
  createContainer,
  bindModules,
  Optional,
  forwardRef,
  ModuleRef,
} from 'reactant-di';

export type {
  Container,
  ValueProvider,
  ModuleProvider,
  ClassProvider,
  FactoryProvider,
  ModuleOptions,
  ServiceIdentifiersMap,
  ContainerOptions,
} from 'reactant-di';

export * from './core/index';
export * from './decorators/index';
export * from './utils/index';
export * from './constants/index';
export * from './interfaces';
