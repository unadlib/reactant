import type { ReactantAction } from 'reactant-module';

export const LastActionOptions = Symbol('LastActionOptions');

export interface ILastActionOptions {
  /**
   * Define a string as LastAction reducer key.
   */
  stateKey?: string;
  /**
   * ignore action tracking
   */
  ignoreAction?: (action: ILastActionData) => boolean;
}

export type ILastActionData = Pick<
  ILastActionState<unknown>,
  Exclude<keyof ILastActionState, '_inversePatches' | 'state'>
>;

export interface ILastActionState<T = any> extends ReactantAction<T> {
  /**
   * sync sequence
   */
  _sequence?: number;
}
