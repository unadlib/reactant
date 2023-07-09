//  Client to Server
export const proxyClientActionName = '@@reactant:proxyClient';
export const preloadedStateActionName = '@@reactant:preloadedState';
export const isClientName = '@@reactant:isClient';
export const loadFullStateActionName = '@@reactant:loadFullState';
export const syncRouterName = '@@reactant:syncRouter';
// Server to Client
export const proxyServerActionName = '@@reactant:proxyServer';
export const lastActionName = '@@reactant:lastAction';
export const syncToClientsName = '@@reactant:syncToClients';
export const syncWorkerRouterName = '@@reactant:syncWorkerRouter';

export const SharedAppOptions = Symbol('SharedAppOptions');

export const storageModuleName = 'Storage';
export const routerModuleName = 'Router';

// Coworker
export const proxyExecutorKey = Symbol('proxyExecutor');
export const proxyWorkerExecuteName = '@@reactant:coworkerProxyWorkerExecute';
export const syncStateName = '@@reactant:coworkerSyncState';
export const syncAllStateName = '@@reactant:coworkerSyncAllState';
// Redux action types
export const syncStateActionName = '@@reactant:syncState';
export const syncModuleStateActionName = '@@reactant:syncModuleState';
