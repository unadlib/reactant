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
    if (typeof this.component !== 'function') {
      throw new Error(
        `'${
          Object.getPrototypeOf(this).constructor.name
        }' View 'component' property should be defined class 'method'.`
      );
    }
    const component = this.component.bind(this);
    Object.assign(component, {
      defaultProps: this.defaultAttrs,
    });
    this.component = component;
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
