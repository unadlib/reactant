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
   *
   */
  server?: Transport<ServerTransport, ClientTransport>;
  /**
   *
   */
  client?: Transport<ClientTransport, ServerTransport>;
}
export interface Config<T> extends BaseConfig<T> {
  /**
   *
   */
  share: {
    /**
     *
     */
    name: string;
    /**
     *
     */
    type: 'SharedTab' | 'BrowserExtension' | 'SharedWorker';
    /**
     *
     */
    transports?: Transports;
    /**
     *
     */
    port?: Port;
    /**
     *
     */
    sharedWorkerURL?: string;
  };
}

export type Transform = (changedPort: Port) => void;

export type Callback = () => void | Promise<void>;

export type CallbackWithHook = <T = any, P = any>(
  /**
   *
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
