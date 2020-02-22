import { getServices, Container } from 'reactant-di';
import { View } from './view';

const rawGetterMap = new Map<Function, Record<string, PropertyDescriptor>>();
let SelectorsMap: Map<object, Record<string, Function>>;
let currentComputedMark: [object, string] | [];

export const getSelector = (selector: any) => {
  if (typeof currentComputedMark === 'undefined') return selector;
  const [serviceInstance, name] = currentComputedMark;
  if (
    serviceInstance &&
    name &&
    SelectorsMap.has(serviceInstance) &&
    SelectorsMap.get(serviceInstance)![name]
  ) {
    return SelectorsMap.get(serviceInstance)![name];
  }
  SelectorsMap.set(serviceInstance!, {
    ...SelectorsMap.get(serviceInstance!),
    [name!]: selector,
  });
  return selector;
};

const markSelector = (serviceInstance: object, name: string) => {
  currentComputedMark = [serviceInstance, name];
};

const unmarkSelector = () => {
  currentComputedMark = [];
};

export function injectComputedTrack(container: Container) {
  SelectorsMap = new Map();
  const Services = getServices().filter(Service => Service !== View);
  for (const Service of Services) {
    const serviceInstance = container.get<Function>(Service);
    const descriptors = Object.getOwnPropertyDescriptors(Service.prototype);
    Object.entries(descriptors).forEach(([name, descriptor]) => {
      if (
        serviceInstance instanceof View &&
        (name === 'props' || name === 'defaultAttrs')
      )
        return;
      if (typeof descriptor.get === 'function') {
        let fn = descriptor.get;
        if (
          typeof rawGetterMap.get(Service) === 'undefined' ||
          (rawGetterMap.get(Service) && !rawGetterMap.get(Service)![name])
        ) {
          const primitiveDescriptor = Object.getOwnPropertyDescriptor(
            Service.prototype,
            name
          );
          if (primitiveDescriptor) {
            rawGetterMap.set(Service, {
              ...rawGetterMap.get(Service),
              [name]: primitiveDescriptor!,
            });
          }
        } else {
          fn = rawGetterMap.get(Service)![name].get!;
        }
        Object.defineProperty(Service.prototype, name, {
          ...descriptor,
          enumerable: false,
          get() {
            markSelector(this, name);
            const result = fn.call(serviceInstance);
            unmarkSelector();
            return result;
          },
        });
      }
    });
  }
}
