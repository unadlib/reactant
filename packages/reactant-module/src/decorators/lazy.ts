import { getLazyDecorator } from 'reactant-di';
import { containerKey } from '../constants';
import { Service } from '../interfaces';

export const lazy = getLazyDecorator((serviceIdentifier, target?: Service) => {
  try {
    return target![containerKey]!.get(serviceIdentifier);
  } catch (e) {
    console.warn(e);
  }
  return null;
});
