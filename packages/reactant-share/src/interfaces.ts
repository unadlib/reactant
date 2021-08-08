import { Transport } from 'data-transport';
import { Config as BaseConfig, App, ReactantAction } from 'reactant';
import {
  isClientName,
  lastActionName,
  preloadedStateActionName,
  proxyClientActionName,
} from './constants';

export type Port = 'server' | 'client';

export interface Transports {
  /**
   * Server Transport
   */
  server?: Transport<ServerTransport, ClientTransport>;
  /**
   * Client Transport
   */
  client?: Transport<ClientTransport, ServerTransport>;
}
export interface Config<T> extends BaseConfig<T> {
  /**
   * Reactant shared app options.
   */
  share: {
    /**
     * Reactant shared app name.
     */
    name: string;
    /**
     * Reactant shared app type.
     */
    type: 'SharedTab' | 'BrowserExtension' | 'SharedWorker';
    /**
     * Shared app's transports
     */
    transports?: Transports;
    /**
     * Specify 'client' or 'server' port.
     */
    port?: Port;
    /**
     * Specify a SharedWorker URL
     */
    sharedWorkerURL?: string;
  };
}

export type Transform = (changedPort: Port) => void;

export type Callback = () => void | Promise<void>;

export type CallbackWithHook = <T = any, P = any>(
  /**
   * Shared app's transport
   */
  transport?: Transport<T, P>
) => void | (() => void);

export type PortApp = Partial<Record<Port, App<any>>>;

export interface ClientTransport {
  [proxyClientActionName](options: {
    module: string;
    method: string;
    args: any[];
  }): Promise<any>;
  [preloadedStateActionName](): Promise<Record<string, any>>;
  [isClientName](): Promise<boolean>;
}

export interface ServerTransport {
  [lastActionName](
    action: Pick<
      ReactantAction<any>,
      Exclude<keyof ReactantAction<any>, '_inversePatches'>
    >
  ): Promise<void>;
}
