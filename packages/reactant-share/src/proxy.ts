import { Service as Module } from 'reactant';
import { proxyClient } from './client';
import { checkPort } from './port';

export const proxy = (
  module: Module,
  actions: Record<string, (...args: any) => any>
) =>
  // TODO: add Proxy
  Object.entries(actions).reduce(
    (proxiedActions, [method, action]) =>
      Object.assign(proxiedActions, {
        [method]: (...args: any) =>
          checkPort('server')
            ? action(...args)
            : proxyClient({ module: module.name!, method, args }),
      }),
    {} as Record<string, (...args: any) => Promise<any>>
  );
