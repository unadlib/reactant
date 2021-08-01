import { useMemo } from 'react';
import { Service } from 'reactant';
import { proxyAction } from './proxyAction';
import { getIsServer } from './serverChecker';

export const useProxies = (
  module: Service,
  getFunctions: () => Record<string, (...args: any) => any>
) =>
  useMemo(() => {
    Object.entries(getFunctions.call(module)).reduce(
      (actions, [method, action]) =>
        Object.assign(actions, {
          [method]: (...args: any) =>
            getIsServer()
              ? action(...args)
              : proxyAction({ module: module.name!, method, args }),
        }),
      {} as Record<string, (...args: any) => Promise<any>>
    );
  }, []);
