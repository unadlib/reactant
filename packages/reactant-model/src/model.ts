import { produce, produceWithPatches, Patch } from 'immer';
import {
  storeKey,
  Service,
  stateKey,
  actionIdentifier,
  enablePatchesKey,
} from 'reactant-module';

type ServiceName = Pick<Service, 'name'>;

interface Scheme<S, A> extends ServiceName {
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
  Object.keys(scheme.actions).forEach((key) => {
    const fn = scheme.actions[key];
    Object.assign(scheme.actions, {
      [key]: (...args: any[]) => {
        let state: S | undefined;
        let patches: Patch[] | undefined;
        let inversePatches: Patch[] | undefined;
        if (module[enablePatchesKey]) {
          [state, patches, inversePatches] = produceWithPatches(
            module[stateKey],
            (draftState: S) => {
              fn(...args)(draftState);
            }
          );
        } else {
          state = produce(module[stateKey], (draftState: S) => {
            fn(...args)(draftState);
          });
        }
        const lastState = module[storeKey]?.getState();
        module[storeKey]!.dispatch({
          type: module.name,
          method: key,
          state: {
            ...lastState,
            [module.name!]: state,
          },
          _reactant: actionIdentifier,
          ...(module[enablePatchesKey]
            ? {
                _patches: patches,
                _inversePatches: inversePatches,
              }
            : {}),
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
