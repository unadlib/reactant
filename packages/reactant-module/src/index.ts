export { apply as applyPatches, current, original, unsafe } from 'mutative';

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
  getMetadata,
  METADATA_KEY,
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
  ServiceIdentifier,
} from 'reactant-di';

export * from './core/index';
export * from './decorators/index';
export * from './utils/index';
export * from './constants/index';
export * from './interfaces';
