import { multiInject as multiInjectWithInversify, decorate } from 'inversify';
import { ServiceIdentifier } from '../interfaces';

export function multiInject(token: ServiceIdentifier<any>) {
  return (target: object, targetKey?: string, index?: number) => {
    decorate(multiInjectWithInversify(token) as ClassDecorator, target, index);
  };
}
