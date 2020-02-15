import { injectable } from 'reactant-di';

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
      defaultProps: this.defaultProps,
    });
    this.props = {} as T;
  }

  /**
   * this module inject props to current component props.
   */
  abstract get data(): P;

  /**
   * current react component props.
   */
  props: T;

  /**
   * current react component default props.
   */
  // eslint-disable-next-line class-methods-use-this
  get defaultProps(): T {
    return {} as T;
  }

  /**
   * this module bind component for UI, and it contains a connector with redux.
   * and `props` or `this.props` from parent component, `this.data` from this module.
   * @param props react component props.
   */
  abstract component(props: T): React.ComponentElement<any, any>;
}
