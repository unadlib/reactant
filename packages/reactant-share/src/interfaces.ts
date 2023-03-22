/* eslint-disable no-use-before-define */
import type { EmitParameter, Transport } from 'data-transport';
import type { Config as BaseConfig, App, Renderer } from 'reactant';
import type { ILastActionState } from 'reactant-last-action';
import type { RouterState } from 'reactant-router';
import {
  isClientName,
  lastActionName,
  loadFullStateActionName,
  preloadedStateActionName,
  proxyClientActionName,
  proxyServerActionName,
  syncRouterName,
  syncWorkerRouterName,
  syncToClientsName,
} from './constants';

export type { Transport } from 'data-transport';

export type Port = 'server' | 'client';

export interface Transports {
  /**
   * Server Transport
   */
  server?: Transport<{ listen: ServerEvents; emit: ClientEvents }>;
  /**
   * Client Transport
   */
  client?: Transport<{ listen: ClientEvents; emit: ServerEvents }>;
}

export interface ISharedAppOptions {
  /**
   * Reactant shared app name.
   */
  name: string;
  /**
   * Reactant shared app type.
   */
  type: 'SharedTab' | 'SharedWorker' | 'Base';
  /**
   * Shared app's transports
   */
  transports?: Transports;
  /**
   * Specify 'client' or 'server' port.
   */
  port?: Port;
  /**
   * Specify a port name for routing and fork() args.
   */
  portName?: string;
  /**
   * Specify a SharedWorker URL
   */
  workerURL?: string;
  /**
   * Specify a SharedWorker
   */
  worker?: SharedWorker;
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
  /**
   * Forced Sync for all client, enabled by default.
   *
   * If forcedSyncClient is false, then only the client's visibilityState is visible will the state be synchronized from server port.
   *
   * `forcedSyncClient` is only true in `SharedTab` type.
   */
  forcedSyncClient?: boolean;
}

export interface Config<T, S extends any[], R extends Renderer<S>>
  extends BaseConfig<T, S, R> {
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

export type PortApp = Partial<Record<Port, App<any, any, any>>>;

export interface ClientEvents {
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
  [syncRouterName](name: string, router?: RouterState): Promise<RouterState>;
}

export type ActionOptions = Pick<
  ILastActionState,
  Exclude<keyof ILastActionState, '_inversePatches'>
>;

export interface ServerEvents {
  [proxyServerActionName](options: {
    module: string;
    method: string;
    args: any[];
    portName?: string;
    clientIds?: string[];
  }): Promise<void>;
  [lastActionName](options: ActionOptions): Promise<void>;
  [syncToClientsName](
    options: Record<string, any> | null | undefined
  ): Promise<void>;
  [syncWorkerRouterName](name: string): Promise<RouterState | undefined>;
}

export interface HandleServerOptions {
  app: App<any, any, any>;
  transport: Transports['server'];
  disposeClient?: () => void;
  disposeServer?: () => void;
  enablePatchesChecker?: boolean;
}

export interface HandleClientOptions {
  app: App<any, any, any>;
  transport: Transports['client'];
  disposeServer?: () => void;
  disposeClient?: () => void;
  enablePatchesFilter?: boolean;
  preloadedState?: Record<string, any>;
}

export type FunctionKeys<T> = Exclude<
  {
    [K in keyof T]: T[K] extends Function ? K : never;
  }[keyof T],
  void
>;

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
  options?: { respond?: O; portName?: string; clientIds?: string[] } & Pick<
    EmitParameter<any>,
    Exclude<keyof EmitParameter<any>, 'name' | 'respond'>
  >
) => O extends false
  ? void
  : ReturnType<T[K]> extends Promise<infer R>
  ? Promise<R>
  : Promise<ReturnType<T[K]>>;
