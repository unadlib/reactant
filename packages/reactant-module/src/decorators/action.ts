import { produce } from 'immer';
import { getStore } from '../core/store';

type ThisType = { state: Record<string, any>; name: string };

export function action(
  target: object,
  key: string | symbol,
  descriptor: TypedPropertyDescriptor<any>
) {
  const fn = descriptor.value;
  // eslint-disable-next-line func-names
  const value = function(this: ThisType, ...args: any[]) {
    const states = produce(this.state, (draftState: Record<string, any>) => {
      fn.call({ ...this, state: draftState }, ...args);
    });
    getStore().dispatch({
      type: this.name,
      states,
    });
  };
  return {
    ...descriptor,
    value,
  };
}
