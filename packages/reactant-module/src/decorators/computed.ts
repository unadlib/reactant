import { createSelectorWithArray } from '../utils';
/**
 * ### Example
 *
 * ```ts
 * class Foo {
 *   @state
 *   count = 0;
 *
 *   @state
 *   list = [];
 *
 *   @computed(({ count, list }: Foo) => [count, list])
 *   get number() {
 *     return this.count + this.list.length;
 *   }
 * }
 * ```
 */
export const computed = (depsCallback: (instance: any) => any[]) => (
  target: object,
  key: string,
  descriptor: TypedPropertyDescriptor<any>
) => {
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
  const selector = createSelectorWithArray(depsCallback, descriptor.get!);
  return {
    ...descriptor,
    get() {
      return selector.call(this);
    },
  };
};
