import {
  decorate,
  inject as injectWithInversify,
  LazyServiceIdentifer,
} from 'inversify';

import { METADATA_KEY } from '../constants';
import { lookupServiceIdentifier } from '../createContainer';
import { forwardRef } from '../forwardRef';
import { ServiceIdentifierOrFunc } from '../interfaces';

export function inject(serviceIdentifierOrFunc?: ServiceIdentifierOrFunc<any>) {
  return (target: object, targetKey?: string, index?: number) => {
    const self = Reflect.getMetadata(METADATA_KEY.paramtypes, target)[index!];
    let serviceIdentifier: ServiceIdentifierOrFunc<any>;
    if (serviceIdentifierOrFunc instanceof LazyServiceIdentifer) {
      serviceIdentifier = serviceIdentifierOrFunc;
    } else if (typeof serviceIdentifierOrFunc === 'undefined') {
      serviceIdentifier = forwardRef(() =>
        lookupServiceIdentifier(target, self, index)
      );
    } else {
      serviceIdentifier = forwardRef(() =>
        lookupServiceIdentifier(target, serviceIdentifierOrFunc, index)
      );
    }
    decorate(
      injectWithInversify(serviceIdentifier) as ClassDecorator,
      target,
      index
    );
  };
}
