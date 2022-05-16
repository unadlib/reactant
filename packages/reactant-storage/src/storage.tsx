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

export type SetStorageOptions<T> = Pick<
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
  protected blacklist: string[] = ['router', 'lastAction'];

  persistor?: Persistor;

  onRehydrate?: () => void;

  rehydrated = false;

  constructor(@inject(StorageOptions) public options: IStorageOptions) {
    super();
  }

  protected persistConfig: Record<string, PersistConfig<any>> = {};

  protected persistRootConfig = {
    key: 'root',
    ...this.options,
  };

  private storageSettingMap = new Map<object, Function>();

  setStorage<T extends object>(target: T, options: SetStorageOptions<T>) {
    const module: Service = target;
    if (typeof module[nameKey] !== 'string') {
      throw new Error(
        `Module '${module.constructor.name}' is invalid for using 'setStorage', The parameter 'options.name' of the decorator '@injectable(options)' that decorates the '${module.constructor.name}' module must be specified as a string.`
      );
    }
    if (typeof module[stateKey] !== 'object') {
      throw new Error(
        `Module '${module.constructor.name}' is invalid for using 'setStorage', The current module does not have any global state that is decorated with '@state'.`
      );
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
        const reducer = persistReducer(persistConfig, reducers[key]);
        Object.assign(reducers, {
          [key]: reducer,
        });
      } else if (this.persistRootConfig.blacklist) {
        // use blacklist mode
        if (isTempIdentifier) {
          if (__DEV__) {
            console.warn(
              `For state persistence, The '@injectable({ name })' in the ${key} module has not been set yet.`
            );
          }
        }
      }
    });
    return reducers;
  }

  afterCombineRootReducers(rootReducer: Reducer) {
    return persistReducer(
      {
        blacklist: [...Object.keys(this.persistConfig), ...this.blacklist],
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
      this.persistor = persistStore(store, null, () => {
        // TODO: check
        this.rehydrated = true;
        this.onRehydrate?.();
      });
    };
    this.persistor = persistStore(store, null, () => {
      this.rehydrated = true;
      this.onRehydrate?.();
    });
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
