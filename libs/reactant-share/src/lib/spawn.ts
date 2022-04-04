import { containerKey, identifierKey, Service } from 'reactant';
import { proxyClientActionName } from './constants';
import { ProxyExec } from './interfaces';
import { PortDetector } from './portDetector';

/**
 * Proxy execute On the server side.
 *
 * ## Description
 *
 * `spawn()` is very similar to the actor model,
 *  which transfers the corresponding module method to the server thread for execution and returns the result as response.
 *
 * Note: It does not create new threads, it always runs on the server thread that has already been created.
 *
 * ## Example
 *
 * ```tsx
 * import React from 'react';
 * import { ViewModule, createApp, injectable, useConnector, action, state, spawn } from 'reactant-share';
 *
 * @injectable({ name: 'counter'})
 * class Counter {
 *   @state
 *   count = 0;
 *
 *   @action
 *   increase() {
 *     this.count += 1;
 *   }
 * }
 *
 * @injectable()
 * export class AppView extends ViewModule {
 *   constructor(public counter: Counter) {
 *     super();
 *   }
 *
 *   component() {
 *     const count = useConnector(() => this.counter.count);
 *     return (
 *       <button type="button" onClick={() => spawn(this.counter, 'increase', [])}>
 *         {count}
 *       </button>
 *     );
 *   }
 * }
 * ```
 * reference: https://en.wikipedia.org/wiki/Actor_model
 */
export const spawn: ProxyExec = (module, key, args, options = {}) => {
  const method = module[key];
  if (typeof key !== 'string') {
    throw new Error(
      `'spawn()' is valid only for method name with string type.`
    );
  }
  if (typeof method !== 'function') {
    throw new Error(
      `The property '${key}'' must be a method in class '${module.constructor.name}'.`
    );
  }
  if (!Array.isArray(args)) {
    throw new Error(`The parameters of the method '${key}' must be an array.`);
  }
  const target: Service = module;
  if (target[containerKey]?.isBound(PortDetector)) {
    const portDetector = target[containerKey]!.get(PortDetector);
    // if the port is not a client, it just run the method in server port.
    if (portDetector.isClient) {
      if (process.env['NODE_ENV'] !== 'production') {
        const moduleName = target.constructor.name;
        if (typeof target[identifierKey] !== 'string') {
          throw new Error(
            `The identifier of module '${moduleName}' should be a string, please check 'provide' for the module or the 'name' field of the module.`
          );
        }
        if (/^@@reactant/.test(target[identifierKey]!)) {
          throw new Error(
            `The identifier '${target[identifierKey]}' is a temporary string, please set 'provide' for the module '${moduleName}' or the 'name' field of the module '${moduleName}'.`
          );
        }
      }
      if (!portDetector.transports.client) {
        return Promise.reject(
          new Error(
            `Detected that the current client transport does not exist.`
          )
        );
      }
      return portDetector.transports.client.emit(
        {
          ...options,
          name: proxyClientActionName,
        },
        {
          module: target[identifierKey]!,
          method: key,
          args: args ?? [],
        }
      );
    }
  }
  return (method as Function).apply(target, args);
};
