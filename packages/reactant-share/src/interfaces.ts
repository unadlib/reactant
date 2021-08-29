import type { Transport } from 'data-transport';
import type { Config as BaseConfig, App } from 'reactant';
import type { ILastActionState } from 'reactant-last-action';
import type { Router, RouterState } from 'reactant-router';
import {
  isClientName,
  lastActionName,
  loadFullStateActionName,
  preloadedStateActionName,
  proxyClientActionName,
  routerChangeName,
  syncRouterName,
  syncToClientsName,
} from './constants';
import type { RouterChangeNameOptions } from './router';

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

export interface ISharedAppOptions {
  /**
   * Reactant shared app name.
   */
  name: string;
  /**
   * Reactant shared app type.
   */
  type:
    | 'SharedTab'
    | 'BrowserExtension'
    | 'SharedWorker'
    | 'ServiceWorker'
    | 'Base';
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
  workerURL?: string;
  /**
   * Specify a ServiceWorker or SharedWorker
   */
  worker?: ServiceWorker | SharedWorker;
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
}

export interface Config<T> extends BaseConfig<T> {
  /**
   * Reactant shared app options.
   */
  share: ISharedAppOptions;
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
  [loadFullStateActionName](
    sequence: number
  ): Promise<Record<string, any> | null | undefined>;
  [isClientName](): Promise<boolean>;
  [syncRouterName](): Promise<Router['router']['location']>;
}

export type ActionOptions = Pick<
  ILastActionState,
  Exclude<keyof ILastActionState, '_inversePatches'>
>;

export interface ServerTransport {
  [lastActionName](options: ActionOptions): Promise<void>;
  [routerChangeName](options: RouterChangeNameOptions): Promise<RouterState>;
  [syncToClientsName](
    options: Record<string, any> | null | undefined
  ): Promise<void>;
}

export interface ProxyClientOptions {
  module: string;
  method: string;
  args: any[];
  clientTransport: Transports['client'];
}
export interface HandleServerOptions {
  app: App<any>;
  transport: Transports['server'];
  disposeClient?: () => void;
  enablePatchesChecker?: boolean;
}

export interface HandleClientOptions {
  app: App<any>;
  transport: Transports['client'];
  disposeServer?: () => void;
  enablePatchesFilter?: boolean;
  preloadedState?: Record<string, any>;
}
