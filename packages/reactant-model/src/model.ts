import { create, Patch, Immutable } from 'mutative';
import {
  storeKey,
  Service,
  stateKey,
  actionIdentifier,
  enablePatchesKey,
  enableAutoFreezeKey,
  identifierKey,
  nameKey,
} from 'reactant-module';

interface Scheme<S, A> {
  name: string;
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
        let state: Immutable<S> | S | undefined;
        let patches: Patch[] | undefined;
        let inversePatches: Patch[] | undefined;
        if (module[enablePatchesKey]) {
          [state, patches, inversePatches] = create(
            module[stateKey] as S,
            (draftState: S) => {
              fn(...args)(draftState);
            },
            {
              enablePatches: true,
              enableAutoFreeze: module[enableAutoFreezeKey],
            }
          );
        } else {
          state = create(
            module[stateKey] as S,
            (draftState: S) => {
              fn(...args)(draftState);
            },
            {
              enableAutoFreeze: module[enableAutoFreezeKey],
            }
          );
        }
        const lastState = module[storeKey]?.getState();
        module[storeKey]!.dispatch({
          type: module[identifierKey],
          method: key,
          state: {
            ...lastState,
            [module[identifierKey]!]: state,
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
    [nameKey]: scheme.name,
    [stateKey]: {
      ...scheme.state,
    },
    ...scheme.actions,
  };
  return module as any;
};
