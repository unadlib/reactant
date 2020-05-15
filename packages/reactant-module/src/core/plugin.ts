import { FunctionComponent } from 'react';
import { injectable } from 'reactant-di';
import {
  Middleware,
  PreloadedState,
  Reducer,
  ReducersMapObject,
  Store,
} from 'redux';

import { storeKey } from '../constants';
import { Service } from '../interfaces';

@injectable()
export abstract class PluginModule implements Service {
  readonly [storeKey]?: Store;

  name?: string;

  preloadedStateHandler?(
    preloadedState: PreloadedState<any>
  ): PreloadedState<any>;

  middleware?: Middleware;

  enhancer?: Function;

  afterCreateStore?(store: Store): void;

  // TODO: beforeCombineReducers & afterCombineReducers

  beforeCombineRootReducers?(reducers: ReducersMapObject): ReducersMapObject;

  afterCombineRootReducers?(rootReducer: Reducer): Reducer;

  provider?: FunctionComponent;
}
