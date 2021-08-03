import { Service as Module } from 'reactant';
import { proxyAction } from './proxyAction';
import { getServer } from './server';

export const proxy = (
  module: Module,
  actions: Record<string, (...args: any) => any>
) =>
  Object.entries(actions).reduce(
    (proxiedActions, [method, action]) =>
      Object.assign(proxiedActions, {
        [method]: (...args: any) =>
          getServer()
            ? action(...args)
            : proxyAction({ module: module.name!, method, args }),
      }),
    {} as Record<string, (...args: any) => Promise<any>>
  );
