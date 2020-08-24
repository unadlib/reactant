/* eslint-disable func-names */
/* eslint-disable prefer-rest-params */
import { areShallowEqualWithArray } from './isEqual';

export function defaultMemoize(func: (...args: any) => any) {
  const lastArgs: Map<any, IArguments | null> = new Map();
  const lastResult: Map<any, unknown> = new Map();
  return function (this: ThisType<unknown>) {
    if (!areShallowEqualWithArray(lastArgs.get(this) ?? [], arguments)) {
      // @ts-ignore
      lastResult.set(this, func.apply(this, arguments));
    }
    lastArgs.set(this, arguments);
    return lastResult.get(this);
  };
}

const createSelectorCreatorWithArray = (
  memoize: (...args: any) => (...args: any) => any = defaultMemoize
) => {
  return (
    dependenciesFunc: (that: any) => any[],
    resultFunc: (...args: any) => any
  ) => {
    const memoizedResultFunc = memoize(function (this: ThisType<unknown>) {
      // @ts-ignore
      return resultFunc.apply(this, arguments);
    });
    return function (this: ThisType<unknown>) {
      return memoizedResultFunc.apply(
        this,
        dependenciesFunc.apply(null, [this])
      );
    };
  };
};

export const createSelectorWithArray = createSelectorCreatorWithArray();
