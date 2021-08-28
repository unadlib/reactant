/* eslint-disable consistent-return */
import React, { PropsWithChildren, ReactNode } from 'react';
import {
  PluginModule,
  injectable,
  inject,
  Service,
  stateKey,
  identifierKey,
  nameKey,
} from 'reactant-module';
import { Reducer, ReducersMapObject, Store } from 'redux';
import {
  persistStore,
  persistReducer,
  Storage,
  PersistConfig,
  Persistor,
} from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const StorageOptions = Symbol('StorageOptions');

export interface IStorageOptions extends Partial<PersistConfig<any>> {
  /**
   * define storage container
   */
  storage: Storage;
  /**
   * define storage loading UI
   */
  loading?: ReactNode;
}

type SetStorageOptions<T> = Pick<
  Partial<PersistConfig<any>>,
  Exclude<keyof PersistConfig<any>, 'key' | 'blacklist' | 'whitelist'>
> & {
  /**
   * define persistent data blacklist
   */
  blacklist?: (keyof T)[];
  /**
   * define persistent data whitelist
   */
  whitelist?: (keyof T)[];
};

@injectable()
class ReactantStorage extends PluginModule {
  protected blacklist: string[] = [];

  protected persistor?: Persistor;

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

  private storageSettingMap = new Map<object, Function>();

  setStorage<T extends object>(target: T, options: SetStorageOptions<T>) {
    const module: Service = target;
    if (
      typeof module[stateKey] !== 'object' ||
      typeof module[nameKey] !== 'string'
    ) {
      if (__DEV__) {
        console.warn(
          `Module '${module}' is invalid for using 'setStorage', The parameter 'options.name' of the decorator '@injectable(options)' that decorates the '${module}' module must be specified as a string.`
        );
      }
      return;
    }
    if (this.storageSettingMap.has(module)) {
      if (__DEV__) {
        console.warn(
          `Module '${module}' has already been set up with Storage.`
        );
      }
      return;
    }
    this.storageSettingMap.set(module, () => {
      const persistConfig = {
        storage: this.options.storage,
        ...options,
        key: module[identifierKey],
      };
      Object.assign(this.persistConfig, {
        [module[identifierKey]!]: persistConfig,
      });
    });
  }

  beforeCombineRootReducers(reducers: ReducersMapObject): ReducersMapObject {
    for (const [_, set] of this.storageSettingMap) {
      set();
    }
    Object.keys(reducers).forEach((key) => {
      const isTempIdentifier = /^@@reactant\//.test(key);
      if (isTempIdentifier) {
        this.blacklist.push(key);
      }
      const persistConfig = this.persistConfig[key];
      if (persistConfig) {
        if (isTempIdentifier) {
          if (__DEV__) {
            console.warn(
              `For state persistence, The '@injectable({ name })' in the ${key} module has not been set yet.`
            );
          }
          return;
        }
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
        blacklist: [
          ...Object.keys(this.persistConfig),
          ...this.blacklist,
          'router',
        ],
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
      this.persistor = persistStore(store);
    };
    this.persistor = persistStore(store);
  }

  provider = (props: PropsWithChildren<{}>) => {
    return (
      <PersistGate
        loading={this.options.loading || null}
        persistor={this.persistor!}
      >
        {props.children}
      </PersistGate>
    );
  };
}

export { ReactantStorage as Storage, StorageOptions };
