/* eslint-disable @typescript-eslint/no-empty-interface */
import { injectable, inject } from 'reactant';
import {
  Storage as BaseReactantStorage,
  StorageOptions,
} from 'reactant-storage';
import type { IStorageOptions as IBaseStorageOptions } from 'reactant-storage';
import { SharedAppOptions } from './constants';
import { ISharedAppOptions } from './interfaces';
import { PortDetector } from './portDetector';

export interface IStorageOptions extends IBaseStorageOptions {
  //
}

@injectable()
class ReactantStorage extends BaseReactantStorage {
  rehydrateCallbackSet = new Set<() => void>();

  constructor(
    @inject(StorageOptions) public options: IStorageOptions,
    @inject(SharedAppOptions) protected sharedAppOptions: ISharedAppOptions
  ) {
    super(options);

    this.onRehydrate = () => {
      const callbacks = Array.from(this.rehydrateCallbackSet);
      this.rehydrateCallbackSet.clear();
      for (const callback of callbacks) {
        callback();
      }
    };
  }
}

export { ReactantStorage as Storage, StorageOptions };
