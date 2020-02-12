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
    this.attrs = {} as T;
  }

  abstract get props(): P;

  attrs: T;

  abstract component(props: T): React.ComponentElement<any, any>;
}
