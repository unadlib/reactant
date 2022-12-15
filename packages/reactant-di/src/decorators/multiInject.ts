import { multiInject as multiInjectWithInversify, decorate } from 'inversify';
import { METADATA_KEY } from '../constants';
import { ServiceIdentifier } from '../interfaces';
import { setMetadata } from '../util';

export function multiInject(serviceIdentifier: ServiceIdentifier<any>) {
  return (target: object, key?: string, index?: number) => {
    const paramtypes = Reflect.getMetadata(METADATA_KEY.paramtypes, target);
    setMetadata(METADATA_KEY.multiple, paramtypes[index!], serviceIdentifier);
    decorate(
      multiInjectWithInversify(serviceIdentifier) as ClassDecorator,
      target,
      index
    );
  };
}
