/* eslint-disable consistent-return */
import { injectable } from 'reactant';
import { createTransport, Transport } from 'data-transport';

import { PortDetector } from './portDetector';

@injectable({
  name: 'CoworkerAdapter',
})
export class CoworkerAdapter {
  /**
   * The transport instance of the current process.
   */
  public transport?: Transport;

  constructor(protected portDetector: PortDetector) {
    if (!this.portDetector.isClient) {
      this.transport = this.createTransport();
    }
  }

  protected createTransport() {
    if (this.portDetector.isWorkerMode) {
      if (this.portDetector.isCoworker) {
        return createTransport('Broadcast', {
          prefix: this.prefix,
        });
      }
      if (this.portDetector.sharedAppOptions.port === 'server') {
        return createTransport('Broadcast', {
          prefix: this.prefix,
        });
      }
    } else if (this.portDetector.isCoworker) {
      return createTransport('SharedWorkerInternal', {});
    } else {
      if (!this.portDetector.sharedAppOptions.coworker?.worker) {
        throw new Error('No coworker support');
      }
      return createTransport('SharedWorkerClient', {
        worker: this.portDetector.sharedAppOptions.coworker.worker,
      });
    }
  }

  protected get prefix() {
    return `${this.portDetector.sharedAppOptions.name}-Coworker`;
  }

  /**
   * Whether the current process is the coworker process.
   */
  get isCoworker() {
    return this.portDetector.isCoworker;
  }

  /**
   * Whether the current process is the main process.
   */
  get isMain() {
    return !this.isCoworker && !!this.transport;
  }
}
