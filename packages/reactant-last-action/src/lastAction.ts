/* eslint-disable default-param-last */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PluginModule,
  injectable,
  storeKey,
  ReactantStore,
  ReactantAction,
  optional,
  actionIdentifier,
} from 'reactant-module';
import { ReducersMapObject } from 'redux';

const LastActionOptions = Symbol('LastActionOptions');

export interface ILastActionState<T = any> extends ReactantAction<T> {
  /**
   * sync sequence
   */
  _sequence?: number;
}

export type ILastActionData = Pick<
  ILastActionState<unknown>,
  Exclude<keyof ILastActionState, '_inversePatches' | 'state'>
>;

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

@injectable()
class ReactantLastAction extends PluginModule {
  readonly [storeKey]?: ReactantStore;

  stateKey: string;

  private _sequence: number | undefined;

  constructor(@optional(LastActionOptions) public options: ILastActionOptions) {
    super();
    this.stateKey = this.options?.stateKey ?? 'lastAction';
  }

  beforeCombineRootReducers(reducers: ReducersMapObject): ReducersMapObject {
    if (Object.prototype.hasOwnProperty.call(reducers, this.stateKey)) {
      throw new Error(
        `The identifier '${this.stateKey}' has a duplicate name, please reset the option 'stateKey' of 'LastAction' module.`
      );
    }
    return Object.assign(reducers, {
      [this.stateKey]: (
        _state: ILastActionState | null = null,
        {
          _inversePatches,
          state,
          rehydrate,
          register,
          ...action
        }: ILastActionState & { rehydrate: any; register: any }
      ) => {
        // ignore redux-persist property function in the action
        const rehydrateObj =
          typeof rehydrate === 'function' ||
          typeof rehydrate === 'undefined' ||
          rehydrate === null
            ? {}
            : { rehydrate };
        const registerObj =
          typeof register === 'function' ||
          typeof register === 'undefined' ||
          register === null
            ? {}
            : { register };
        // ignore inversePatches and state
        const reactantObj =
          action._reactant === actionIdentifier
            ? {}
            : { state, _inversePatches };
        const sequence = _state?._sequence ?? 0;
        const shouldIgnore = this.options?.ignoreAction?.(
          action as ILastActionData
        );
        return {
          ...action,
          ...rehydrateObj,
          ...registerObj,
          ...reactantObj,
          _sequence: shouldIgnore ? sequence : sequence + 1,
        };
      },
    });
  }

  set sequence(value: number) {
    this._sequence = value;
  }

  get sequence() {
    return this._sequence ?? this.action?._sequence ?? 0;
  }

  get action(): ILastActionData {
    return this[storeKey]?.getState()[this.stateKey] ?? null;
  }
}

export { ReactantLastAction as LastAction, LastActionOptions };
