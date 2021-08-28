import { containerKey, identifierKey, Service } from 'reactant';
import { proxyClient } from '../client';
import { PortDetector } from '../portDetector';

/**
 * proxify
 *
 * It is used to turn a method into a proxied method.
 * The execution of the decorated method in the client will be proxied by the same method in the server by the associated parameters.
 */
export const proxify = (
  target: object,
  key: string,
  descriptor: TypedPropertyDescriptor<(...args: any[]) => Promise<any>>
) => {
  const fn = descriptor.value;
  if (typeof fn !== 'function') {
    throw new Error(
      `${String(key)} can only be decorated by '@proxify' as a class method.`
    );
  }
  function value(this: Service, ...args: any) {
    const portDetector = this[containerKey]?.get(PortDetector);
    if (portDetector?.isClient) {
      if (__DEV__) {
        const moduleName = target.constructor.name;
        if (typeof this[identifierKey] !== 'string') {
          throw new Error(
            `The identifier of module '${moduleName}' should be a string, please check 'provide' for the module or the 'name' field of the module.`
          );
        }
        if (/^@@reactant/.test(this[identifierKey]!)) {
          throw new Error(
            `The identifier '${this[identifierKey]}' is a temporary string, please set 'provide' for the module '${moduleName}' or the 'name' field of the module '${moduleName}'.`
          );
        }
      }
      return proxyClient({
        module: this[identifierKey]!,
        method: key,
        args,
        clientTransport: portDetector.transports.client,
      });
    }
    return fn!.apply(this, args);
  }
  return {
    ...descriptor,
    value,
  };
};
