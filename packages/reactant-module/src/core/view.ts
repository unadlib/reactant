import { injectable } from 'reactant-di';

type OptionalKeyOf<T> = {
  [K in keyof T]-?: T extends Record<K, T[K]> ? never : K;
}[keyof T];

type RequiredOnlyOptional<T> = Pick<Required<T>, OptionalKeyOf<T>>;

export interface UserInterface<P, T> {
  /**
   * this module inject props to current component props.
   */
  readonly props: Required<T> & P;
  /**
   * current component external pass props with redux's connector.
   */
  attrs: Required<T>;
  /**
   * current react component default props.
   */
  readonly defaultAttrs: RequiredOnlyOptional<T>;
  /**
   * this module bind component for UI, and it contains a connector with redux.
   * and `props` or `this.props` from parent component, `this.data` from this module.
   * @param props react component props.
   */
  component(attrs: T): React.ComponentElement<any, any>;
}

@injectable()
export abstract class View<P extends {} = {}, T extends {} = {}>
  implements UserInterface<P, T> {
  constructor() {
    if (typeof this.component !== 'function') {
      throw new Error(
        `'${
          Object.getPrototypeOf(this).constructor.name
        }' View 'component' property should be defined class 'method'.`
      );
    }
  }

  abstract get props(): Required<T> & P;

  attrs = {} as Required<T>;

  get defaultAttrs(): RequiredOnlyOptional<T> {
    return {} as RequiredOnlyOptional<T>;
  }

  abstract component(attrs: T): React.ComponentElement<any, any>;
}
