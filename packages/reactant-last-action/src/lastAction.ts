/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PluginModule,
  injectable,
  storeKey,
  ReactantStore,
  ReactantAction,
  optional,
} from 'reactant-module';
import { ReducersMapObject } from 'redux';

const LastActionOptions = Symbol('LastActionOptions');

export interface ILastActionOptions {
  /**
   * Define a string as LastAction reducer key.
   */
  stateKey?: string;
}

@injectable()
class ReactantLastAction extends PluginModule {
  readonly [storeKey]?: ReactantStore;

  protected stateKey: string;

  constructor(@optional(LastActionOptions) public options: ILastActionOptions) {
    super();
    this.stateKey = this.options?.stateKey ?? 'lastAction';
  }

  beforeCombineRootReducers(reducers: ReducersMapObject): ReducersMapObject {
    return Object.assign(reducers, {
      [this.stateKey]: (
        _state: ReactantAction | null = null,
        { state, ...action }: ReactantAction
      ) => action,
    });
  }

  get lastAction(): ReactantAction {
    return this[storeKey]?.getState()[this.stateKey] ?? null;
  }
}

export { ReactantLastAction as LastAction, LastActionOptions };
