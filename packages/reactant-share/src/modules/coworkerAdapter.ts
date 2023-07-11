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
        return (
          this.coworkerConfig!.transports?.coworker ??
          createTransport('Broadcast', {
            prefix: this.prefix,
            verbose: this.coworkerConfig?.enableTransportDebugger,
          })
        );
      }
      if (this.portDetector.sharedAppOptions.port === 'server') {
        return (
          this.coworkerConfig!.transports?.main ??
          createTransport('Broadcast', {
            prefix: this.prefix,
            verbose: this.coworkerConfig?.enableTransportDebugger,
          })
        );
      }
    } else if (this.portDetector.isCoworker) {
      return (
        this.coworkerConfig!.transports?.coworker ??
        createTransport('SharedWorkerInternal', {
          prefix: this.prefix,
          verbose: this.coworkerConfig?.enableTransportDebugger,
        })
      );
    } else if (this.portDetector.sharedAppOptions.port !== 'client') {
      if (this.coworkerConfig!.transports?.main) {
        return this.coworkerConfig!.transports.main;
      }
      if (!this.coworkerConfig?.worker) {
        if (__DEV__) console.warn('No coworker support in server port.');
        return;
      }
      return createTransport('SharedWorkerClient', {
        worker: this.coworkerConfig.worker,
        prefix: this.prefix,
        verbose: this.coworkerConfig.enableTransportDebugger,
      });
    }
  }

  get coworkerConfig() {
    return this.portDetector.sharedAppOptions.coworker;
  }

  protected get prefix() {
    return `reactant-share:${this.portDetector.sharedAppOptions.name}:coworker`;
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
