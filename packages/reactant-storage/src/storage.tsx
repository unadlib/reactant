import React, { PropsWithChildren, ReactNode } from 'react';
import {
  PluginModule,
  injectable,
  inject,
  Service,
  stateKey,
  PartialRequired,
} from 'reactant-module';
import { Reducer, ReducersMapObject, Store } from 'redux';
import { useStore } from 'react-redux';
import {
  persistStore,
  persistReducer,
  Storage,
  PersistConfig,
} from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';

const StorageOptions = Symbol('StorageOptions');

export interface IStorageOptions extends Partial<PersistConfig<any>> {
  storage: Storage;
  loading?: ReactNode;
}

type SetStorageOptions<T> = Pick<
  Partial<PersistConfig<any>>,
  Exclude<keyof PersistConfig<any>, 'key' | 'blacklist' | 'whitelist'>
> & {
  blacklist?: (keyof T)[];
  whitelist?: (keyof T)[];
};

@injectable()
class ReactantStorage extends PluginModule {
  constructor(@inject(StorageOptions) public options: IStorageOptions) {
    super();
    if (__DEV__) {
      if (
        typeof this.options.storage === 'undefined' ||
        this.options.storage === null
      ) {
        console.warn(
          `Module 'Storage' must depend on the 'StorageOptions', and 'StorageOptions' should set 'storage' property.
            example:
              {
                provide: StorageOptions,
                useValue: {
                  storage,
                },
              }
          `
        );
      }
    }
  }

  protected persistConfig: Record<string, PersistConfig<any>> = {};

  protected persistRootConfig = {
    key: 'root',
    ...this.options,
  };

  setStorage<T extends PartialRequired<Service, 'name'>>(
    target: T,
    options: SetStorageOptions<T>
  ) {
    if (
      typeof target[stateKey] !== 'object' ||
      typeof target.name !== 'string'
    ) {
      if (__DEV__) {
        console.warn(
          `Module '${target}' is invalid for using 'setStorage', it should set 'name' and  '@state' decorated properties in module '${target}'.`
        );
      }
      return;
    }
    const persistConfig = {
      storage: this.options.storage,
      ...options,
      key: target.name,
    };
    Object.assign(this.persistConfig, {
      [target.name]: persistConfig,
    });
  }

  beforeCombineRootReducers(reducers: ReducersMapObject): ReducersMapObject {
    Object.keys(reducers).forEach(key => {
      const persistConfig = this.persistConfig[key];
      if (persistConfig) {
        const reducer = persistReducer(persistConfig, reducers[key]);
        Object.assign(reducers, {
          [key]: reducer,
        });
      }
    });
    return reducers;
  }

  afterCombineRootReducers(rootReducer: Reducer) {
    return persistReducer(
      {
        blacklist: [...Object.keys(this.persistConfig), 'router'],
        ...this.persistRootConfig,
      },
      rootReducer
    );
  }

  afterCreateStore(store: Store) {
    const { replaceReducer } = store;
    // eslint-disable-next-line no-param-reassign
    store.replaceReducer = (reducer: Reducer) => {
      replaceReducer(reducer);
      persistStore(store);
    };
  }

  provider = (props: PropsWithChildren<{}>) => {
    const persistor = persistStore(useStore());
    return (
      <PersistGate loading={this.options.loading || null} persistor={persistor}>
        {props.children}
      </PersistGate>
    );
  };
}

export { ReactantStorage as Storage, storage as localStorage, StorageOptions };
