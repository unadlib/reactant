import {
  ReducersMapObject,
  Middleware,
  PreloadedState,
  Reducer,
  Store,
} from 'redux';
import { injectable } from 'reactant-di';
import { storeKey, actionIdentifierKey } from '../constants';
import { Service } from '../interfaces';

@injectable()
export abstract class PluginModule implements Service {
  readonly [storeKey]?: Store;

  readonly [actionIdentifierKey]?: symbol;

  preloadedStateHandler?(
    preloadedState: PreloadedState<any>
  ): PreloadedState<any>;

  middleware?: Middleware;

  enhancer?: Function;

  afterCreateStore?(store: Store): void;

  // TODO beforeCombineReducers & afterCombineReducers

  beforeCombineRootReducers?(reducers: ReducersMapObject): ReducersMapObject;

  afterCombineRootReducers?(rootReducer: Reducer): Reducer;

  provider?(props: Record<string, any>): React.ComponentElement<any, any>;
}
