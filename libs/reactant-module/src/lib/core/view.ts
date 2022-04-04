import { Store } from 'redux';
import { injectable } from 'reactant-di';
import { identifierKey, storeKey } from '../constants';
import { Service } from '../interfaces';

@injectable()
abstract class ViewModule implements Service {
  readonly [identifierKey]?: string;

  readonly [storeKey]?: Store;

  constructor() {
    // It needs to ensure that the default props of the component in the current instance can be assigned values,
    // and have the correct 'this' binding.
    if (typeof this.component !== 'function') {
      throw new Error(
        `'${
          Object.getPrototypeOf(this).constructor.name
        }' ViewModule 'component' property should be defined class 'method'.`
      );
    }
    const { defaultProps } = this.component as React.FunctionComponent;
    const component = this.component.bind(this);
    Object.assign(component, {
      defaultProps,
    });
    this.component = component;
  }

  /**
   * React function component defined by the current ViewModule
   */
  abstract component(props: Record<string, any>): React.ReactElement | null;
}

export { ViewModule };
