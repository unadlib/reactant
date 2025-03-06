/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-use-before-define */
import type {
  BaseInteraction,
  EmitParameter,
  MergeInteraction,
  Transport,
} from 'data-transport';
import type { Config as BaseConfig, App, Renderer } from 'reactant';
import type { ILastActionData } from 'reactant-last-action';
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
  syncClientIdsFromClientsName,
  syncClientIdToServerName,
  removeClientIdToServerName,
  proxyExecutorKey,
} from './constants';

export type { Transport } from 'data-transport';

export type Port = 'server' | 'client';

export interface Transports {
  /**
   * Server Transport
   */
  server?: ServerTransport;
  /**
   * Client Transport
   */
  client?: ClientTransport;
}

export type ServerTransport<T extends BaseInteraction = {}> = Transport<
  MergeInteraction<{ emit: ServerEvents; listen: ClientEvents }, T>
>;

export type ClientTransport<T extends BaseInteraction = {}> = Transport<
  MergeInteraction<
    {
      emit: ClientEvents;
      listen: ServerEvents;
    },
    T
  >
>;

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
   * Enable transport debugger for shared app.
   */
  enableTransportDebugger?: boolean;
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
  /**
   * forced share, disabled by default.
   */
  forcedShare?: boolean;
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

export type CallbackWithHook<T extends Transport = Transport<any>> = (
  /**
   * Shared app's transport
   */
  transport: T
) => void | (() => void);

export type PortApp = Partial<Record<Port, App<any, any, any>>>;

export interface ProxyExecParams {
  /**
   * module name
   */
  module: string;
  /**
   * method name
   */
  method: string;
  /**
   * method arguments
   */
  args: any[];
  /**
   * hook execution options
   */
  hook?: string;
}

export type ClientEvents = {
  [proxyClientActionName](options: ProxyExecParams): Promise<[number, any]>;
  [preloadedStateActionName](): Promise<Record<string, any>>;
  [loadFullStateActionName](
    sequence: number
  ): Promise<Record<string, any> | null | undefined>;
  [isClientName](): Promise<boolean>;
  [syncRouterName](
    name: string,
    timestamp: number,
    router?: RouterState
  ): Promise<RouterState>;
  [syncClientIdToServerName](clientId: string): void;
  [removeClientIdToServerName](clientId: string): void;
};

export type ServerEvents = {
  [proxyServerActionName](
    options: ProxyExecParams & {
      portName?: string;
      clientIds?: string[];
      excludeClientIds?: string[];
    }
  ): Promise<void>;
  [lastActionName](options: ILastActionData): Promise<void>;
  [syncToClientsName](
    options: Record<string, any> | null | undefined
  ): Promise<void>;
  [syncWorkerRouterName](name: string): Promise<RouterState | undefined>;
  [syncClientIdsFromClientsName](): Promise<void>;
};

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

type ProxyArgs<
  F extends (...args: any[]) => any,
  O extends EmitParameter<any>['respond']
> = Parameters<F> extends []
  ? [
      /**
       * Pass in the parameters for this method.
       */
      args?: Parameters<F>,
      /**
       * proxy execution options
       */
      options?: { respond?: O; portName?: string; clientIds?: string[] } & Pick<
        EmitParameter<any>,
        Exclude<keyof EmitParameter<any>, 'name' | 'respond'>
      >
    ]
  : [
      /**
       * Pass in the parameters for this method.
       */
      args: Parameters<F>,
      /**
       * proxy execution options
       */
      options?: { respond?: O; portName?: string; clientIds?: string[] } & Pick<
        EmitParameter<any>,
        Exclude<keyof EmitParameter<any>, 'name' | 'respond'>
      >
    ];

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
  ...args: ProxyArgs<T[K], O>
) => O extends false
  ? void
  : ReturnType<T[K]> extends Promise<infer R>
  ? Promise<R>
  : Promise<ReturnType<T[K]>>;

export type SymmetricTransport<
  T extends Record<string, (...args: any[]) => any>
> = Transport<{
  emit: T;
  listen: T;
}>;

export interface ProxyExecutor {
  [proxyExecutorKey]?: (params: ProxyExecParams) => Promise<unknown>;
}
