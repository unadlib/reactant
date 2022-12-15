/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { multiOptional, ServiceIdentifier } from 'reactant-di';

import { containerKey, dynamicModulesKey, identifierKey } from '../constants';
import type { DynamicModules, PropertyDescriptor } from '../interfaces';

type Dynamic = <M extends boolean = false>(
  serviceIdentifier: ServiceIdentifier<unknown>,
  options?: {
    /**
     * Whether to inject multiple instances.
     */
    multiple?: boolean;
  }
) => (
  target: object,
  key: string | symbol,
  descriptor?: PropertyDescriptor<unknown>
) => void;

export const dynamic: Dynamic = (serviceIdentifier, options) => (
  target,
  key
) => {
  const multipleInject = options?.multiple ?? false;
  if (multipleInject) {
    multiOptional(serviceIdentifier)(class {});
  }
  function getter(this: any) {
    const dynamicModules: DynamicModules = this[dynamicModulesKey];
    if (__DEV__ && !dynamicModules) {
      throw new Error(
        `The property '${key.toString()}' is not readable when class ${
          this[identifierKey] ?? this.constructor.name
        } is constructing.`
      );
    }
    if (dynamicModules.has(serviceIdentifier)) {
      return dynamicModules.get(serviceIdentifier)!.value;
    }
    let value: unknown = null;
    try {
      const services = this[containerKey]!.getAll(serviceIdentifier);
      value = !multipleInject ? services[0] : services;
    } catch (e) {
      //
    }
    dynamicModules.set(serviceIdentifier, { multiple: multipleInject, value });
    return value;
  }

  function setter(this: any, _: unknown) {
    throw new Error(
      `Cannot assign to read only 'dynamic' injection property '${key.toString()}' of class '${
        this[identifierKey] ?? this.constructor.name
      }'`
    );
  }

  // It should be compatible with the TS decorator and the babel decorator
  return {
    configurable: true,
    enumerable: true,
    get: getter,
    set: setter,
  } as any;
};
