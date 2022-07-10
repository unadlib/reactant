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

export interface IStorageOptions extends IBaseStorageOptions {
  //
}

@injectable()
class ReactantStorage extends BaseReactantStorage {
  constructor(
    protected portDetector: PortDetector,
    @inject(StorageOptions) public options: IStorageOptions
  ) {
    super(options);
    this.onRehydrated(() => {
      this.portDetector.onServer(() => {
        this.persistor!.persist();
      });
      this.portDetector.onClient(() => {
        this.persistor!.pause();
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
