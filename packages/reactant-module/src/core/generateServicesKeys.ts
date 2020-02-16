import { getServices } from 'reactant-di';

export type ServicesKeysMap = Map<object, string[]>;

export function generateServicesKeys<T>(
  service: T,
  servicesKeysMap: ServicesKeysMap
) {
  Object.entries(service).forEach(([key, depService]) => {
    const prototype = Object.getPrototypeOf(depService).constructor;
    if (getServices().includes(prototype)) {
      const keys = servicesKeysMap.get(depService);
      if (Array.isArray(keys)) {
        keys.push(key);
      } else {
        servicesKeysMap.set(depService, [key]);
      }
      generateServicesKeys(depService, servicesKeysMap);
    }
  });
}
