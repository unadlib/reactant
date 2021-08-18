import { Transport } from 'data-transport';
import { Config as BaseConfig, App } from 'reactant';
import { ILastActionState } from 'reactant-last-action';
import { Router } from 'reactant-router';
import {
  isClientName,
  lastActionName,
  loadFullStateActionName,
  preloadedStateActionName,
  proxyClientActionName,
  syncRouterName,
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
    type: 'SharedTab' | 'BrowserExtension' | 'SharedWorker' | 'Base';
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
    /**
     * Enable patches filter to support minimized modules collections in client port.
     */
    enablePatchesFilter?: boolean;
    /**
     * Enable patches checker to support minimized patches in server port.
     */
    enablePatchesChecker?: boolean;
    /**
     * Transform client/server port
     */
    transform?: Transform;
  };
}

export type Transform = (changedPort: Port) => void;

export type Callback = () => void | Promise<void>;

export type CallbackWithHook<T extends Transport = Transport<any, any>> = (
  /**
   * Shared app's transport
   */
  transport: T
) => void | (() => void);

export type PortApp = Partial<Record<Port, App<any>>>;

export interface ClientTransport {
  [proxyClientActionName](options: {
    module: string;
    method: string;
    args: any[];
  }): Promise<any>;
  [preloadedStateActionName](): Promise<Record<string, any>>;
  [loadFullStateActionName](): Promise<Record<string, any>>;
  [isClientName](): Promise<boolean>;
  [syncRouterName](): Promise<Router['router']['location']>;
}

export type ActionOptions = Pick<
  ILastActionState,
  Exclude<keyof ILastActionState, '_inversePatches'>
>;

export interface ServerTransport {
  [lastActionName](options: ActionOptions): Promise<void>;
}
