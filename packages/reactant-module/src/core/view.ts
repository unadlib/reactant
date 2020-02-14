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
    (this.component as any).defaultProps = this.defaultProps;
    this.props = {} as T;
  }

  abstract get data(): P;

  props: T;

  // eslint-disable-next-line class-methods-use-this
  get defaultProps(): T {
    return {} as T;
  }

  abstract component(props: T): React.ComponentElement<any, any>;
}
