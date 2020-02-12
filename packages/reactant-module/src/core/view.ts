export abstract class View<P extends {} = {}, T = {}> {
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
  }

  abstract get props(): P;

  abstract component(props?: T): React.ComponentElement<any, any>;
}
