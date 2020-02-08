export abstract class View<P extends {} = {}> {
  props: P;

  constructor() {
    this.props = this.getProps();
  }

  abstract getProps(): P;

  abstract component(): React.ComponentElement<P, any>;
}
