/* eslint-disable consistent-return */
import { containerKey, identifierKey, Service, watch } from 'reactant';
import { proxyClientActionName, proxyExecutorKey } from './constants';
import type { ProxyExec, ProxyExecutor } from './interfaces';
import { PortDetector } from './modules/portDetector';

/**
 * Proxy execute On the server side.
 *
 * ## Description
 *
 * `delegate()` is very similar to the actor model,
 *  which transfers the corresponding module method to the server thread for execution and returns the result as response.
 *
 * Note: It does not create new threads, it always runs on the server thread that has already been created.
 *
 * ## Example
 *
 * ```tsx
 * import React from 'react';
 * import { ViewModule, createApp, injectable, useConnector, action, state, delegate } from 'reactant-share';
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
 *       <button type="button" onClick={() => delegate(this.counter, 'increase', [])}>
 *         {count}
 *       </button>
 *     );
 *   }
 * }
 * ```
 * reference: https://en.wikipedia.org/wiki/Actor_model
 */
export const delegate = ((module, key, args, options = {}) => {
  const method = module[key];
  const _args = args ?? [];
  if (typeof key !== 'string') {
    throw new Error(
      `'delegate()' is valid only for method name with string type.`
    );
  }
  if (typeof method !== 'function') {
    throw new Error(
      `The property '${key}'' must be a method in class '${module.constructor.name}'.`
    );
  }
  if (!Array.isArray(_args)) {
    throw new Error(`The parameters of the method '${key}' must be an array.`);
  }
  const target: Service & ProxyExecutor = module;
  if (target[containerKey]?.isBound(PortDetector)) {
    const portDetector = target[containerKey]!.get(PortDetector);
    if (__DEV__) {
      const moduleName = target.constructor.name;
      if (/^@@reactant/.test(target[identifierKey]!)) {
        throw new Error(
          `The identifier '${target[identifierKey]}' is a temporary string, please set 'provide' for the module '${moduleName}' or the 'name' field of the module '${moduleName}'.`
        );
      }
    }
    // If the method in main thread and use coworker, it should be proxied for execution to a coworker thread.
    if (target[proxyExecutorKey]) {
      return target[proxyExecutorKey]({
        module: target[identifierKey]!,
        method: key,
        args: _args,
      });
    }
    // If the port is not a client, it just run the method in server port.
    if (portDetector.isClient) {
      if (!portDetector.transports.client) {
        return Promise.reject(
          new Error(
            `Detected that the current client transport does not exist.`
          )
        );
      }
      return portDetector.transports.client
        .emit(
          {
            ...options,
            name: proxyClientActionName,
          },
          {
            module: target[identifierKey]!,
            method: key,
            args: _args,
            hook: options._extra?.serverHook,
          }
        )
        .then((response) => {
          // If the response is undefined, it means that the method is not executed.
          if (!response) return;
          const [sequence, result] = response;
          if (portDetector.lastAction.sequence >= sequence) {
            return result;
          }
          if (__DEV__) {
            console.warn(
              `The sequence of the action is not consistent in ${target[identifierKey]}.${key}.`,
              sequence,
              portDetector.lastAction.sequence
            );
          }
          return portDetector
            .syncFullState({ forceSync: false })
            .then(() => result);
        });
    }
  }
  return (method as Function).apply(target, _args);
}) as ProxyExec;
