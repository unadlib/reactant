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

/**
 * ReactantStorage
 * todo
 */
@injectable()
class ReactantStorage extends BaseReactantStorage {
  constructor(
    @inject(StorageOptions) public options: IStorageOptions,
    protected portDetector: PortDetector,
    @inject(SharedAppOptions) protected sharedAppOptions: ISharedAppOptions
  ) {
    super(options);

    this.portDetector.onServer(() => {
      this.persistor?.persist();
    });

    this.portDetector.onClient(() => {
      this.persistor?.pause();
    });
  }
}

export { ReactantStorage as Storage, StorageOptions };
