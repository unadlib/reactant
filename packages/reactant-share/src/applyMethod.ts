import { modulesKey } from 'reactant';
import type { App, ThisService } from 'reactant';

import { proxyExecutorKey } from './constants';
import type { ProxyExecParams, ProxyExecutor } from './interfaces';

export const applyMethod = (
  app: App<any, any, any>,
  options: ProxyExecParams
) => {
  const module: (ThisService & ProxyExecutor) | undefined =
    app.instance[modulesKey][options.module];
  if (!module) {
    throw new Error(
      `The module '${options.module}' is not a multiple instances injected module, and it does not exist.`
    );
  }
  const method = module[options.method];
  if (typeof method !== 'function') {
    throw new Error(
      `The '${options.method}' method for module '${options.module}' does not exist.`
    );
  }
  // If the method in main process and use coworker, it should be proxied for execution to a coworker process.
  if (module[proxyExecutorKey]) {
    return module[proxyExecutorKey](options);
  }
  return method.apply(module, options.args);
};
