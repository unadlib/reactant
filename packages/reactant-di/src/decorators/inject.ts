import { inject as injectWithInversify, decorate } from 'inversify';
import { ServiceIdentifier } from '../interfaces';
import { METADATA_KEY } from '../constants';

export function inject(token?: ServiceIdentifier<any>) {
  return (target: any, targetKey: string, index?: number) => {
    const tokenSelf = Reflect.getMetadata(METADATA_KEY.paramtypes, target)[
      index!
    ];
    injectWithInversify(token || tokenSelf)(target, targetKey, index);
    // decorate(
    //   injectWithInversify(token || tokenSelf) as ClassDecorator,
    //   targetKey,
    //   index
    // );
  };
}
