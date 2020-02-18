import { interfaces } from 'inversify';

const Services: any[] = [];

export const getServices = () => Services;

let ServiceIdentifiers: interfaces.ServiceIdentifier<any>[];

export const getServiceIdentifiers = () => ServiceIdentifiers;

export const setServiceIdentifiers = (
  newServiceIdentifiers: interfaces.ServiceIdentifier<any>[]
) => {
  ServiceIdentifiers = newServiceIdentifiers;
};
