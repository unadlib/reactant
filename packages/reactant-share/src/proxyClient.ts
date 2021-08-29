import type { App, ThisService } from 'reactant';
import { modulesKey } from 'reactant';

export const proxyClient = (
  app: App<any>,
  options: {
    module: string;
    method: string;
    args: any[];
  }
) => {
  const module: ThisService | undefined =
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
  return method.apply(module, options.args);
};
