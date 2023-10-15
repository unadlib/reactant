export * from 'reactant';
export * from 'data-transport';
export * from 'reactant-last-action';
export * from './constants';

export { createSharedApp } from './createApp';
export { PortDetector } from './modules/portDetector';
export {
  Router,
  RouterOptions,
  createBrowserHistory,
  createHashHistory,
  createMemoryHistory,
} from './modules/router';
export {
  Storage,
  StorageOptions,
  REHYDRATE,
  getRehydrated,
} from './modules/storage';
export {
  Coworker,
  CoworkerOptions,
  createCoworker,
  getCoworker,
} from './modules/coworker';
export { useLock } from './lock';
export { spawn } from './spawn';
export { fork } from './fork';
export { mockPairTransports } from './mockPairTransports';
export { createBroadcastTransport } from './createTransport';

export type { IRouterOptions } from './modules/router';
export type { ICoworkerOptions } from './modules/coworker';
export type { IStorageOptions, SetStorageOptions } from './modules/storage';
export type { Transport } from './createTransport';
export type {
  ClientEvents,
  ClientTransport,
  ServerEvents,
  ServerTransport,
  ISharedAppOptions,
  Config as SharedAppConfig,
  SymmetricTransport,
} from './interfaces';
