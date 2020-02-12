export abstract class View<P extends {} = {}> {
  abstract get props(): P;

  abstract get component(): React.ComponentElement<any, any>;
}
