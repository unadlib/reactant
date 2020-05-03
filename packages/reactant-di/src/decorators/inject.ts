import {
  inject as injectWithInversify,
  decorate,
  LazyServiceIdentifer,
} from 'inversify';
import { ServiceIdentifierOrFunc } from '../interfaces';
import { METADATA_KEY } from '../constants';
import { forwardRef, lookupToken } from '../createContainer';

export function inject(token?: ServiceIdentifierOrFunc<any>) {
  return (target: object, targetKey: string, index?: number) => {
    const tokenSelf = Reflect.getMetadata(METADATA_KEY.paramtypes, target)[
      index!
    ];
    let serviceIdentifier: ServiceIdentifierOrFunc<any>;
    if (token instanceof LazyServiceIdentifer) {
      serviceIdentifier = token;
    } else if (typeof token === 'undefined') {
      serviceIdentifier = forwardRef(() =>
        lookupToken(target, tokenSelf, index)
      );
    } else {
      serviceIdentifier = forwardRef(() => lookupToken(target, token, index));
    }
    decorate(
      injectWithInversify(serviceIdentifier) as ClassDecorator,
      target,
      index
    );
  };
}
