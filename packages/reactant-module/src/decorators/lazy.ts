import { getLazyDecorator } from 'reactant-di';
import { containerKey } from '../constants';
import { Service } from '../interfaces';

export const lazy = getLazyDecorator((serviceIdentifier, target?: Service) => {
  try {
    const services = target![containerKey]!.getAll(serviceIdentifier);
    return services.length === 1 ? services[0] : services;
  } catch (e) {
    console.warn(e);
  }
  return null;
});
