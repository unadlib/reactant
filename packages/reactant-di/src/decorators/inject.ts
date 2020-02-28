import {
  inject as injectWithInversify,
  LazyServiceIdentifer,
  interfaces,
} from 'inversify';

export function inject(
  token?: interfaces.ServiceIdentifier<any> | LazyServiceIdentifer
) {
  return (target: any, targetKey: string, index?: number) => {
    const tokenSelf = Reflect.getMetadata('design:paramtypes', target)[index!];
    return injectWithInversify(token || tokenSelf)(target, targetKey, index);
  };
}
