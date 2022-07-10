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
  manualPersist = this.portDetector.shared;

  constructor(
    protected portDetector: PortDetector,
    @inject(StorageOptions) public options: IStorageOptions
  ) {
    super(options);
    this.portDetector.onServer(() => {
      this.persistor!.persist();
      this.onRehydrated(() => this.portDetector.syncToClients());
    });

    this.portDetector.onClient(() => {
      this.persistor!.pause();
    });
  }
}

export {
  ReactantStorage as Storage,
  StorageOptions,
  REHYDRATE,
  SetStorageOptions,
};
