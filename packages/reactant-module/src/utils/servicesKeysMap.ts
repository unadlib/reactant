export type ServicesKeysMap = Map<object, string>;

let servicesKeysMap: ServicesKeysMap;

export const getServicesKeysMap = () => servicesKeysMap;

export const setServicesKeysMap = (
  newServicesKeysMap: ServicesKeysMap
): ServicesKeysMap => {
  servicesKeysMap = newServicesKeysMap;
  return newServicesKeysMap;
};
