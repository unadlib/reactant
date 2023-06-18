/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PluginModule, ReactantAction, injectable } from 'reactant';
import type { Middleware } from 'redux';
import { routerModuleName } from '../constants';
import type { ActionOptions } from '../interfaces';
import { PortDetector } from './portDetector';

@injectable()
export class PatchesChecker extends PluginModule {
  constructor(protected portDetector: PortDetector) {
    super();
  }

  middleware: Middleware = (store) => (next) => (_action: ReactantAction) => {
    const { _patches, type, method } = _action;
    let hasIsolatedState: boolean;
    _patches?.forEach(({ path, op, value }, index) => {
      const _hasIsolatedState = this.portDetector.hasIsolatedState(
        `${path[0]}`
      );
      // ignore first patch
      if (!index) {
        hasIsolatedState = _hasIsolatedState;
      } else if (hasIsolatedState !== _hasIsolatedState) {
        const methodName = `${type as string}.${method}`;
        throw new Error(
          `Update state error: Mixed update of shared state and isolated state is not supported, please check method '${methodName}'.`
        );
      }
    });
    return next(_action);
  };

  checkPatches(oldStateTree: Record<string, any>, options: ActionOptions) {
    options._patches!.forEach(({ op, path, value }) => {
      if (
        op === 'replace' &&
        (toString.call(value) === '[object Object]' || Array.isArray(value))
      ) {
        const oldState = path.reduce(
          (state, _path) => state?.[_path],
          oldStateTree
        );
        if (
          oldState &&
          typeof oldState === 'object' &&
          path[0] !== routerModuleName
        ) {
          const state = path.join('.');
          console.warn(
            `The state '${state}' operation in the method '${
              options.method
            }' of the module '${String(
              options.type
            )}'  is a replacement update operation, be sure to check the state '${state}' update operation and use mutation updates to ensure the minimum set of update patches.`
          );
        }
      }
    });
  }
}
