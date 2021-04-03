import { Store } from 'redux';
import { injectable } from 'reactant-di';
import { identifierKey, storeKey } from '../constants';
import { Service } from '../interfaces';

@injectable()
abstract class ViewModule implements Service {
  readonly [identifierKey]?: string;

  readonly [storeKey]?: Store;

  /**
   * The name field will be used as a key to define the state of this module in the reducers object map in the store.
   * If it is not defined, then it defaults to a random string.
   * So in cases where persistence is required, etc., it must be defined, otherwise the issue will appear
   */
  name?: string;

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
