interface Scheme<T> {
  state: State<T>;
  actions: Actions<T>;
}

type State<T> = T extends { state: infer R } ? R : never;

type Actions<T> = T extends { actions: infer R } ? R : never;

export const model = <T extends Scheme<{ state: any; actions: any }>>(
  scheme: T
): State<T> & Actions<T> => {
  return {
    ...scheme.state,
    ...scheme.actions,
  };
};
