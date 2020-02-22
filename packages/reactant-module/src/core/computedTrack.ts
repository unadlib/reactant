type Key = string | symbol;
let SelectorsCache: Map<object, Map<Key, Function>>;
let currentComputedMark: [object, Key] | [];

export const setSelectorsCache = (
  newSelectorsCache: Map<object, Map<Key, Function>>
) => {
  SelectorsCache = newSelectorsCache;
};

export const getSelector = (selector: any) => {
  if (typeof currentComputedMark === 'undefined') return selector;
  const [serviceInstance, name] = currentComputedMark;
  if (typeof serviceInstance === 'undefined' || typeof name === 'undefined') {
    throw new Error(`'selector' should be decorated with '@computed'.`);
  }
  let serviceInstanceMap = SelectorsCache.get(serviceInstance);
  if (
    serviceInstance &&
    name &&
    typeof serviceInstanceMap !== 'undefined' &&
    serviceInstanceMap.get(name)
  ) {
    return serviceInstanceMap.get(name);
  }
  if (
    typeof serviceInstanceMap === 'undefined' ||
    serviceInstanceMap === null
  ) {
    serviceInstanceMap = new Map();
    SelectorsCache.set(serviceInstance, serviceInstanceMap);
  }
  serviceInstanceMap.set(name, selector);
  return selector;
};

export const markSelector = (serviceInstance: object, name: Key) => {
  currentComputedMark = [serviceInstance, name];
};

export const unmarkSelector = () => {
  currentComputedMark = [];
};
