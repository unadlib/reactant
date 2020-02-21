import { getServices, Container } from 'reactant-di';
import { View } from './view';

const SelectorsMap = new Map<object, Record<string, Function>>();
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
        const fn = descriptor.get;
        Object.defineProperty(Service.prototype, name, {
          ...descriptor,
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
