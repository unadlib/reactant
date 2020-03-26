import { storeKey, Service } from 'reactant-module';
import { Dispatch } from 'redux';

interface Scheme<S, A> extends Service {
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
) => {
  let module: Actions<A> & Service<State<S>>;
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
    state: {
      ...scheme.reducers,
    },
    ...scheme.actions,
  };
  return module;
};
