import 'reflect-metadata';

export {
  provide,
  buildProviderModule,
  autoProvide,
} from 'inversify-binding-decorators';
export { optional, inject, decorate } from 'inversify';

export * from './createContainer';
export * from './injectable';
export * from './util';
export * from './interfaces';
