import { FunctionComponent } from 'react';
import {
  ReducersMapObject,
  Middleware,
  PreloadedState,
  Reducer,
  Store,
} from 'redux';
import { injectable } from 'reactant-di';
import { storeKey } from '../constants';
import { Service } from '../interfaces';

@injectable()
abstract class PluginModule implements Service {
  readonly [storeKey]?: Store;

  /**
   * preloaded state handler for Redux
   */
  preloadedStateHandler?(
    preloadedState: PreloadedState<any>
  ): PreloadedState<any>;

  /**
   * inject middleware for Redux
   */
  middleware?: Middleware;

  /**
   * inject enhancer for Redux
   */
  enhancer?: Function;

  /**
   * As hook after createStore
   */
  afterCreateStore?(store: Store): Store;

  /**
   * As hook before combine rootReducers
   */
  beforeCombineRootReducers?(reducers: ReducersMapObject): ReducersMapObject;

  /**
   * As hook after combine rootReducers
   */
  afterCombineRootReducers?(rootReducer: Reducer): Reducer;

  /**
   * Define a React Provider for the current PluginModule
   */
  provider?: FunctionComponent<any>;
}

export { PluginModule };
