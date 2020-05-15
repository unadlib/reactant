import { decorate, optional as optionalWithInversify } from 'inversify';

import { METADATA_KEY } from '../constants';
import { ServiceIdentifier } from '../interfaces';
import { setMetadata } from '../util';
import { multiInject } from './multiInject';

export function multiOptional(serviceIdentifier: ServiceIdentifier<any>) {
  return (target: object, targetKey?: string, index?: number) => {
    const paramtypes = Reflect.getMetadata(METADATA_KEY.paramtypes, target);
    setMetadata(METADATA_KEY.optional, paramtypes[index!], serviceIdentifier);
    decorate(multiInject(serviceIdentifier) as ClassDecorator, target, index);
    decorate(optionalWithInversify() as ClassDecorator, target, index);
  };
}
