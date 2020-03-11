import { Store } from 'redux';
import { injectable } from 'reactant-di';
import { defaultPropsKey, storeKey } from '../constants';
import { Service } from '../interfaces';

@injectable()
export abstract class ViewModule implements Service {
  readonly [storeKey]?: Store;

  name?: string;

  constructor() {
    if (typeof this.component !== 'function') {
      throw new Error(
        `'${
          Object.getPrototypeOf(this).constructor.name
        }' ViewModule 'component' property should be defined class 'method'.`
      );
    }
    const component = this.component.bind(this);
    Object.assign(component, {
      defaultProps: this[defaultPropsKey],
    });
    this.component = component;
  }

  [defaultPropsKey]?: Record<string, any>;

  abstract component(
    props: Record<string, any>
  ): React.ComponentElement<any, any>;
}
