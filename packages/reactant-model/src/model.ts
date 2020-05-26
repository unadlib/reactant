import { produce } from 'immer';
import { storeKey, Service, stateKey, actionIdentifier } from 'reactant-module';

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
): Actions<A> & Service<S> & S => {
  let module: Service<S>;
  Object.keys(scheme.actions).forEach(key => {
    const fn = scheme.actions[key];
    Object.assign(scheme.actions, {
      [key]: (...args: any[]) => {
        const state = produce(module[stateKey], (draftState: S) => {
          fn(...args)(draftState);
        });
        const lastState = module[storeKey]?.getState();
        module[storeKey]!.dispatch({
          type: module.name,
          method: key,
          state: {
            ...lastState,
            [module.name!]: state,
          },
          lastState,
          _reactant: actionIdentifier,
        });
      },
    });
  });
  module = {
    name: scheme.name,
    [stateKey]: {
      ...scheme.state,
    },
    ...scheme.actions,
  };
  return module as any;
};
