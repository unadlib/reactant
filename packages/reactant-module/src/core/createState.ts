import { StateMapObject } from '../interfaces';

export function createState<R extends Record<string, Function>>(reducers: R) {
  return reducers as StateMapObject<R>;
}
