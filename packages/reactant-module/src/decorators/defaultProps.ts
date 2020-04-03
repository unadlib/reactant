import { defaultPropsKey } from '../constants';

// TODO: type
export function defaultProps<P>(props: P) {
  return (
    target: object,
    key: string | symbol,
    propertyDescriptor: TypedPropertyDescriptor<(props: P) => JSX.Element>
  ) => {
    Object.assign(target, {
      [defaultPropsKey]: props,
    });
    return propertyDescriptor;
  };
}
