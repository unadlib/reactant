import { getLazyDecorator, ServiceIdentifier } from 'reactant-di';
import { containerKey } from '../constants';
import { Service, PropertyDescriptor } from '../interfaces';

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
      // TODO: handle error
    }
    return null;
  }
);
