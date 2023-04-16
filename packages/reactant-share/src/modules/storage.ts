/* eslint-disable @typescript-eslint/no-empty-interface */
import { injectable, inject } from 'reactant';
import {
  Storage as BaseReactantStorage,
  StorageOptions,
  REHYDRATE,
} from 'reactant-storage';
import type {
  IStorageOptions as IBaseStorageOptions,
  SetStorageOptions,
} from 'reactant-storage';
import { PortDetector } from './portDetector';
import { storageModuleName } from '../constants';

export interface IStorageOptions extends IBaseStorageOptions {
  //
}

@injectable({
  name: storageModuleName,
})
class ReactantStorage extends BaseReactantStorage {
  constructor(
    protected portDetector: PortDetector,
    @inject(StorageOptions) public options: IStorageOptions
  ) {
    super(options);
    this.onRehydrated(() => {
      this.portDetector.onServer(() => {
        this.persist();
      });
      this.portDetector.onClient(() => {
        this.pause();
      });
      if (this.portDetector.isServer) {
        this.portDetector.syncToClients();
      }
    });
  }
}

export {
  ReactantStorage as Storage,
  StorageOptions,
  REHYDRATE,
  SetStorageOptions,
};
