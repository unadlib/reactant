import { injectable } from 'reactant-di';
import { defaultPropsKey } from '../constants';

@injectable()
export abstract class ViewModule {
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
