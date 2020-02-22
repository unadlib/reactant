import { markSelector, unmarkSelector } from '../core/computedTrack';

export function computed(
  target: object,
  key: string | symbol,
  descriptor: TypedPropertyDescriptor<any>
) {
  const fn = descriptor.value;
  if (typeof fn !== 'function') {
    throw new Error(
      `${target} '@computed' error, it should decorate a class method property.`
    );
  }
  // eslint-disable-next-line func-names
  const value = function(this: ThisType<any>, ...args: any[]) {
    markSelector(target, key);
    const result = fn.call(this, ...args);
    unmarkSelector();
    return result;
  };
  return {
    ...descriptor,
    value,
  };
}
