import { createSelectorWithArray } from '../utils';
import { storeKey, computedKey } from '../constants';
import { Service } from '../interfaces';

/**
 * ## Description
 *
 * You can use `@computed` to decorate a getter function for derived data,
 * which quickly solves performance problems for computing Derived Data.
 *
 * ## Example
 *
 * ```ts
 * class Shop {
 *   @state
 *   fruits = [];
 *
 *   @state
 *   vegetables = [];
 *
 *   @computed(({ fruits, vegetables }: Shop) => [fruits, fruits])
 *   get sum() {
 *     return this.fruits.length + this.vegetables.length;
 *   }
 * }
 * ```
 */
export const computed = (depsCallback: (instance: any) => any[]) => (
  target: object,
  key: string,
  descriptor: TypedPropertyDescriptor<any>
) => {
  const service: Service = target;
  if (process.env.NODE_ENV !== 'production') {
    if (typeof descriptor.get !== 'function') {
      throw new Error(`'@computed' should decorate a getter.`);
    }
    if (typeof depsCallback !== 'function') {
      throw new Error(
        `@computed() parameter should be a selector function for dependencies collection.`
      );
    }
  }
  const getWrappedComputedDescriptor = () => {
    const depsCallbackSelector = createSelectorWithArray(
      (that: Service) => [that[storeKey]!.getState()],
      // eslint-disable-next-line func-names
      function(this: Service) {
        return depsCallback(this);
      }
    );
    const selector = createSelectorWithArray(
      (that: Service) => depsCallbackSelector.call(that),
      function(this: Service) {
        return descriptor.get!.call(this);
      }
    );
    const wrappedComputedDescriptor = {
      ...descriptor,
      get(this: Service) {
        return selector.call(this);
      },
    };
    return wrappedComputedDescriptor;
  };
  if (typeof service[computedKey] === 'undefined') {
    Object.assign(service, {
      [computedKey]: {
        [key]: getWrappedComputedDescriptor,
      },
    });
  } else {
    Object.assign(service[computedKey], {
      [key]: getWrappedComputedDescriptor,
    });
  }
};
