/* eslint-disable no-undef-init */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { multiOptional, ServiceIdentifier } from 'reactant-di';

import {
  containerKey,
  dynamicModulesKey,
  identifierKey,
  modulesKey,
} from '../constants';
import type { DynamicModules, PropertyDescriptor } from '../interfaces';

type Dynamic = <M extends boolean = false, T extends boolean = false>(
  serviceIdentifierOrName: ServiceIdentifier<unknown>,
  options?: {
    /**
     * Whether to inject multiple instances.
     */
    multiple?: T extends false ? false : M;
    /**
     * use token identifier to get service, use name to get service by default.
     */
    useToken?: T;
  }
) => (
  target: object,
  key: string | symbol,
  descriptor?: PropertyDescriptor<unknown>
) => void;

export const dynamic: Dynamic =
  (serviceIdentifierOrName, options) => (target, key) => {
    const multipleInject = options?.multiple ?? false;
    const useToken = options?.useToken ?? false;
    if (multipleInject) {
      multiOptional(serviceIdentifierOrName)(class {});
    }
    function getter(this: any) {
      if (!useToken) {
        return this[modulesKey]?.[serviceIdentifierOrName as string];
      }
      const dynamicModules: DynamicModules = this[dynamicModulesKey];
      if (__DEV__ && !dynamicModules) {
        throw new Error(
          `The property '${key.toString()}' is not readable when class ${
            this[identifierKey] ?? this.constructor.name
          } is constructing.`
        );
      }
      if (dynamicModules.has(serviceIdentifierOrName)) {
        return dynamicModules.get(serviceIdentifierOrName)!.value;
      }
      let value: unknown = undefined;
      try {
        const services = this[containerKey]!.getAll(serviceIdentifierOrName);
        value = !multipleInject ? services[0] : services;
      } catch (e) {
        //
      }
      dynamicModules.set(serviceIdentifierOrName, {
        multiple: multipleInject,
        value,
      });
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
