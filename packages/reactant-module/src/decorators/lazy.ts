import { getLazyDecorator, ServiceIdentifier } from 'reactant-di';

import { containerKey, storeKey } from '../constants';
import { PropertyDescriptor, Service } from '../interfaces';

type Lazy = (
  serviceIdentifier: ServiceIdentifier<unknown>,
  enableCache?: boolean
) => (
  target: object,
  key: string | symbol,
  descriptor?: PropertyDescriptor<any>
) => void;

export const lazy: Lazy = getLazyDecorator(
  (serviceIdentifier, target?: Service) => {
    try {
      const services = target![containerKey]!.getAll(serviceIdentifier);
      return services.length === 1 ? services[0] : services;
    } catch (e) {
      if (__DEV__ && target?.[storeKey]) {
        console.warn(
          `Failed to get instance of lazy loading module ${serviceIdentifier.toString()}.`
        );
      }
    }
    return null;
  }
);
