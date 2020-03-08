import { ReducersMapObject, Middleware, PreloadedState, Reducer } from 'redux';
import { injectable } from 'reactant-di';

@injectable()
export abstract class PluginModule {
  preloadedStateHandler?(
    preloadedState: PreloadedState<any>
  ): PreloadedState<any>;

  middleware?: Middleware;

  enhancer?: Function;

  // TODO beforeCombineReducers & afterCombineReducers

  beforeCombineRootReducers?(reducers: ReducersMapObject): ReducersMapObject;

  afterCombineRootReducers?(rootReducer: Reducer): Reducer;

  provider?(props: Record<string, any>): React.ComponentElement<any, any>;
}
