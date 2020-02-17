import { injectable } from 'reactant-di';

type OptionalKeyOf<T extends object> = {
  [K in keyof T]-?: T extends Record<K, T[K]> ? never : K;
}[keyof T];

type RequiredOnlyOptional<T extends object> = Pick<
  Required<T>,
  OptionalKeyOf<T>
>;

@injectable()
export abstract class View<P extends {} = {}, T extends {} = {}> {
  constructor() {
    const componentPropertyDescriptor = Object.getOwnPropertyDescriptor(
      Object.getPrototypeOf(this),
      'component'
    );
    if (typeof componentPropertyDescriptor === 'undefined') {
      throw new Error(`View 'component' property should be defined.`);
    }
    Object.defineProperty(Object.getPrototypeOf(this), 'component', {
      ...componentPropertyDescriptor,
      value: componentPropertyDescriptor.value.bind(this),
    });
    Object.assign(this.component, {
      defaultProps: this.defaultAttrs,
    });
    this.attrs = {} as Required<T>;
  }

  /**
   * this module inject props to current component props.
   */
  abstract get props(): Required<T> & P;

  /**
   * current react component props.
   */
  attrs: Required<T>; // todo implement from connector

  /**
   * current react component default props.
   */
  // eslint-disable-next-line class-methods-use-this
  get defaultAttrs(): RequiredOnlyOptional<T> {
    return {} as RequiredOnlyOptional<T>;
  }

  /**
   * this module bind component for UI, and it contains a connector with redux.
   * and `props` or `this.props` from parent component, `this.data` from this module.
   * @param props react component props.
   */
  abstract component(attrs: Required<T>): React.ComponentElement<any, any>;
}
