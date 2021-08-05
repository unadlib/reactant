import { identifierKey, Service as Module } from 'reactant';
import { proxyClient } from './client';
import { detectPort } from './port';

export const proxy = (
  module: Module,
  actions: Record<string, (...args: any) => any>
) =>
  // TODO: add Proxy
  Object.entries(actions).reduce(
    (proxiedActions, [method, action]) =>
      Object.assign(proxiedActions, {
        [method]: (...args: any) =>
          detectPort('server')
            ? action(...args)
            : // @ts-ignore
              proxyClient({ module: module[identifierKey], method, args }),
      }),
    {} as Record<string, (...args: any) => Promise<any>>
  );
