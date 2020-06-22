/* eslint-disable func-names */
/* eslint-disable prefer-rest-params */
import { areShallowEqualWithArray } from './isEqual';

export function defaultMemoize(func: Function) {
  let lastArgs: IArguments | null = null;
  let lastResult: unknown = null;
  return function(this: ThisType<unknown>) {
    if (!areShallowEqualWithArray(lastArgs, arguments)) {
      lastResult = func.apply(this, arguments);
    }
    lastArgs = arguments;
    return lastResult;
  };
}

const createSelectorCreatorWithArray = (memoize: Function = defaultMemoize) => {
  return (dependenciesFunc: Function, resultFunc: Function) => {
    const memoizedResultFunc = memoize(function(this: ThisType<unknown>) {
      return resultFunc.apply(this, arguments);
    });
    return function(this: ThisType<unknown>) {
      return memoizedResultFunc.apply(
        this,
        dependenciesFunc.apply(null, [this])
      );
    };
  };
};

export const createSelectorWithArray = createSelectorCreatorWithArray();
