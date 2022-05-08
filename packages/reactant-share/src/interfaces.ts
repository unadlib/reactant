import type { EmitParameter, Transport } from 'data-transport';
import type { Config as BaseConfig, App } from 'reactant';
import type { ILastActionState } from 'reactant-last-action';
import type { Router, RouterState } from 'reactant-router';
import {
  isClientName,
  lastActionName,
  loadFullStateActionName,
  preloadedStateActionName,
  proxyClientActionName,
  proxyServerActionName,
  routerChangeName,
  syncRouterName,
  syncToClientsName,
} from './constants';
import type { RouterChangeNameOptions } from './router';

export type { Transport } from 'data-transport';

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
  type: 'SharedTab' | 'SharedWorker' | 'ServiceWorker' | 'Base';
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
  [proxyServerActionName](options: {
    module: string;
    method: string;
    args: any[];
  }): Promise<void>;
  [lastActionName](options: ActionOptions): Promise<void>;
  [routerChangeName](options: RouterChangeNameOptions): Promise<RouterState>;
  [syncToClientsName](
    options: Record<string, any> | null | undefined
  ): Promise<void>;
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

export type FunctionKeys<T> = Exclude<
  {
    [K in keyof T]: T[K] extends Function ? K : never;
  }[keyof T],
  void
>;

interface SpawnOptions {
  /**
   * Spawn transport, and default transport is client
   */
  port?: Port;
}

export type ProxyExec = <
  T extends Record<string | number | symbol, any>,
  K extends FunctionKeys<T>,
  O extends EmitParameter<any>['respond']
>(
  /**
   * Designate an execution module from the server side.
   */
  module: T,
  /**
   * Specify the name of a method in this module.
   */
  key: K,
  /**
   * Pass in the parameters for this method.
   */
  args: Parameters<T[K]>,
  /**
   * proxy execution options
   */
  options?: { respond?: O } & Pick<
    EmitParameter<any>,
    Exclude<keyof EmitParameter<any>, 'name' | 'respond'>
  >
) => O extends false
  ? void
  : ReturnType<T[K]> extends Promise<infer R>
  ? Promise<R>
  : Promise<ReturnType<T[K]>>;
