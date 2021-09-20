import { containerKey, identifierKey, Service } from 'reactant';
import { proxyClient } from './client';
import { Spawn } from './interfaces';
import { PortDetector } from './portDetector';

export const spawn: Spawn = (module, key, args) => {
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
  const portDetector = target[containerKey]?.get(PortDetector);
  if (portDetector?.isClient) {
    if (__DEV__) {
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
    return proxyClient({
      module: target[identifierKey]!,
      method: key,
      args: args ?? [],
      clientTransport: portDetector.transports.client,
    });
  }
  return (method as Function).apply(target, args);
};
