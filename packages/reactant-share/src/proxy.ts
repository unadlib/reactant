import { Service as Module } from 'reactant';
import { proxyClient } from './client';
import { getServer } from './server';

export const proxy = (
  module: Module,
  actions: Record<string, (...args: any) => any>
) =>
  // TODO: add Proxy
  Object.entries(actions).reduce(
    (proxiedActions, [method, action]) =>
      Object.assign(proxiedActions, {
        [method]: (...args: any) =>
          getServer()
            ? action(...args)
            : proxyClient({ module: module.name!, method, args }),
      }),
    {} as Record<string, (...args: any) => Promise<any>>
  );
