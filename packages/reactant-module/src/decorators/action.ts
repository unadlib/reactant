import { produce } from 'immer';
import { getServicesKeysMap } from '../utils';
import { getStore } from '../core/store';

export function action(
  target: object,
  key: string | symbol,
  descriptor: TypedPropertyDescriptor<any>
) {
  const fn = descriptor.value;
  const value = function(this: { state: Record<string, any> }, ...args: any[]) {
    const states = produce(this.state, (draftState: Record<string, any>) => {
      fn.call({ ...this, state: draftState }, ...args);
    });
    const type = getServicesKeysMap().get(this);
    getStore().dispatch({
      type,
      states,
    });
  };
  return {
    ...descriptor,
    value,
  };
}
