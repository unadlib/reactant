import { produce, applyPatches } from 'immer';
import { storeKey } from '../core/createStore';

type ThisType = { state: Record<string, any>; name: string };

let tempState: any;

export function action(
  target: object,
  key: string | symbol,
  descriptor: TypedPropertyDescriptor<any>
) {
  const fn = descriptor.value;
  // eslint-disable-next-line func-names
  const value = function(this: ThisType, ...args: any[]) {
    if ((this as any)[storeKey]) {
      const state = produce(this.state, (draftState: Record<string, any>) => {
        tempState = draftState;
        fn.call({ ...this, state: draftState }, ...args);
      });
      tempState = undefined;
      (this as any)[storeKey].dispatch({
        type: this.name,
        states: state,
      });
    } else {
      // support inherit `action`.
      fn.call({ ...this, state: tempState }, ...args);
    }
  };
  return {
    ...descriptor,
    value,
  };
}
