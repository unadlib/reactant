export function defaultAttrs<T>(defaultAttrs: T) {
  return function(
    target: object,
    key: string | symbol,
    { value, ...rest }: TypedPropertyDescriptor<any>
  ) {
    const $value: (t: T) => any = value;
    // target.defaultAttrs = defaultAttrs;
    return { value: $value, ...rest };
  };
}
