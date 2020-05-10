import { ServiceIdentifier } from './interfaces';

const defaultUndefinedValue = Symbol('defaultUndefined');

/**
 * > NOTE: does not support Changing dependencies without `@inject`.
 */
class Optional {
  constructor(public identifier: ServiceIdentifier<any>) {}

  get key() {
    return defaultUndefinedValue;
  }
}

export { Optional, defaultUndefinedValue };
