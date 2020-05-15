import { injectable } from 'reactant-di';
import { Store } from 'redux';

import { storeKey } from '../constants';
import { Service } from '../interfaces';

@injectable()
export abstract class ViewModule implements Service {
  readonly [storeKey]?: Store;

  name?: string;

  constructor() {
    // TODO: think about without `super()` in subclass.
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

  abstract component(props: Record<string, any>): React.ReactElement | null;
}
