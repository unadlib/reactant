import { containerKey, identifierKey, Service } from 'reactant';
import { proxyServerActionName } from './constants';
import { ProxyExec } from './interfaces';
import { PortDetector } from './portDetector';

/**
 * Proxy execute On the client side.
 *
 * ## Description
 *
 * `fork()` is very similar to the actor model,
 *  which transfers the corresponding module method to all client threads for execution and returns the result from the first client's response.
 *
 * Note: It does not create new threads, it always runs on all client thread that have already been created.
 *
 * reference: https://en.wikipedia.org/wiki/Actor_model
 */
export const fork: ProxyExec = (
  module,
  key,
  args,
  { portName, clientIds, ...options } = {}
) => {
  const method = module[key];
  if (typeof key !== 'string') {
    throw new Error(`'fork()' is valid only for method name with string type.`);
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
  if (target[containerKey]!.isBound(PortDetector)) {
    const portDetector = target[containerKey]!.get(PortDetector);
    if (!portDetector.isServer) {
      throw new Error(`'fork()' should be running in server port.`);
    }
    if (__DEV__) {
      const moduleName = target.constructor.name;
      if (/^@@reactant/.test(target[identifierKey]!)) {
        throw new Error(
          `The identifier '${target[identifierKey]}' is a temporary string, please set 'provide' for the module '${moduleName}' or the 'name' field of the module '${moduleName}'.`
        );
      }
    }
    if (!portDetector.transports.server) {
      return Promise.reject(
        new Error(`Detected that the current server transport does not exist.`)
      );
    }
    return portDetector.transports.server.emit(
      {
        ...options,
        name: proxyServerActionName,
      },
      {
        module: target[identifierKey]!,
        method: key,
        args,
        clientIds,
        portName,
      }
    );
  }
  return (method as Function).apply(target, args);
};
