import { Action, AnyAction, Reducer } from 'redux';

export function createState<S = any, A extends Action = AnyAction>(
  reducer: Reducer<S, A>
): S {
  return reducer as any;
}
