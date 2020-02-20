type Selector<T> = () => T;

export function computed<T>(selector: Selector<T>) {
  return function(
    target: object,
    key: string | symbol,
    { value, ...rest }: TypedPropertyDescriptor<any>
  ) {
    const $value: (t: T) => any = value;
    return { value: $value, ...rest };
  };
}
