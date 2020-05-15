import { Service, stateKey, storeKey } from 'reactant-module';
import { Dispatch } from 'redux';

type SerivceName = Pick<Service, 'name'>;

interface Scheme<S, A> extends SerivceName {
  reducers: S;
  actions: A;
}

type State<T extends Record<string, (...args: any[]) => any>> = {
  [P in keyof T]: ReturnType<T[P]>;
};

type Actions<T extends Record<string, (...args: any[]) => any>> = {
  [P in keyof T]: (...parameters: Parameters<T[P]>) => void;
};

export const redux = <
  S extends Record<string, any>,
  A extends Record<string, (...args: any[]) => (dispatch: Dispatch) => void>
>(
  scheme: Scheme<S, A>
): Actions<A> & Service<State<S>> & State<S> => {
  let module: Service<State<S>>;
  Object.keys(scheme.actions).forEach(key => {
    const fn = scheme.actions[key];
    Object.assign(scheme.actions, {
      [key]: (...args: any[]) => {
        const { dispatch } = module[storeKey]!;
        fn(...args)(dispatch);
      },
    });
  });
  module = {
    name: scheme.name,
    [stateKey]: {
      ...scheme.reducers,
    },
    ...scheme.actions,
  };
  return module as any;
};
