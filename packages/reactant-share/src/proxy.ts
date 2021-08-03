import { Service } from 'reactant';
import { proxyAction } from './proxyAction';
import { getIsServer } from './serverChecker';

export const proxy = (
  module: Service,
  actions: Record<string, (...args: any) => any>
) =>
  Object.entries(actions).reduce(
    (proxiedActions, [method, action]) =>
      Object.assign(proxiedActions, {
        [method]: (...args: any) =>
          getIsServer()
            ? action(...args)
            : proxyAction({ module: module.name!, method, args }),
      }),
    {} as Record<string, (...args: any) => Promise<any>>
  );
