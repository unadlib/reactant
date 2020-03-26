import { produce } from 'immer';
import { storeKey, Service, StateService } from 'reactant-module';

type SerivceName = Pick<Service, 'name'>;

interface Scheme<S, A> extends SerivceName {
  state: S;
  actions: A;
}

type Actions<T extends Record<string, (...args: any[]) => any>> = {
  [P in keyof T]: (...parameters: Parameters<T[P]>) => void;
};

export const model = <
  S extends Record<string, any>,
  A extends Record<string, (...args: any[]) => (state: S) => void>
>(
  scheme: Scheme<S, A>
) => {
  let module: Actions<A> & StateService<S>;
  Object.keys(scheme.actions).forEach(key => {
    const fn = scheme.actions[key];
    Object.assign(scheme.actions, {
      [key]: (...args: any[]) => {
        const state = produce(module.state, (draftState: S) => {
          fn(...args)(draftState);
        });
        module[storeKey]!.dispatch({
          type: module.name,
          method: key,
          state,
          _reactant: true,
        });
      },
    });
  });
  module = {
    name: scheme.name,
    state: {
      ...scheme.state,
    },
    ...scheme.actions,
  };
  return module;
};
