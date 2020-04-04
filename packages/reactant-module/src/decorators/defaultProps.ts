import { defaultPropsKey } from '../constants';

export function defaultProps<P>(props: P) {
  return (
    target: object,
    key: string | symbol,
    { value, ...rest }: TypedPropertyDescriptor<(props: P) => JSX.Element>
  ) => {
    const $value: (props: P) => JSX.Element = value!;
    Object.assign(target, {
      [defaultPropsKey]: props,
    });
    return { value: $value, ...rest };
  };
}
