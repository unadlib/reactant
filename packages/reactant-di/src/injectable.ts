import { injectable as injectify } from 'inversify';
import { getServices } from './util';

export function injectable() {
  return function fn(target: any) {
    // it has to use `Reflect.getMetadata` with metadata, it just get all injectable deps.
    // so add the services list for `injectable` services.
    getServices().unshift(target);
    injectify()(target);
    return target;
  };
}
