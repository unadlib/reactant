import { PickOptional } from '../interfaces';

export function defaultProps<P>(props: P | PickOptional<P>) {
  return (
    target: object,
    key: string | symbol,
    { value, ...rest }: TypedPropertyDescriptor<(props: P) => JSX.Element>
  ) => {
    Object.assign(value, {
      defaultProps: props,
    });
    return { value, ...rest };
  };
}
