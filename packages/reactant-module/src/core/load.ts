import { Load } from '../interfaces';
import { loaderKey } from '../constants';

const load: Load = (service, options) => {
  return new Promise((resolve) => {
    service[loaderKey]!(options, resolve);
  });
};

export { load };
