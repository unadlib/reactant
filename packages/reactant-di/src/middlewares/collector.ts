import { interfaces } from 'inversify';

import { ServiceIdentifiersMap } from '../interfaces';

function lookupServiceIdentifiers(
  request: interfaces.Request,
  ServiceIdentifiers: ServiceIdentifiersMap
) {
  if (!ServiceIdentifiers.has(request.serviceIdentifier)) {
    const depServiceIdentifier = request.childRequests.map(
      childRequest => childRequest.serviceIdentifier
    );
    ServiceIdentifiers.set(request.serviceIdentifier, depServiceIdentifier);
    if (request.childRequests.length === 0) return;
    request.childRequests.forEach(childRequest => {
      lookupServiceIdentifiers(childRequest, ServiceIdentifiers);
    });
  }
}

export function createCollector(ServiceIdentifiers: ServiceIdentifiersMap) {
  return (planAndResolve: interfaces.Next): interfaces.Next => (
    args: interfaces.NextArgs
  ) => {
    const nextContextInterceptor = args.contextInterceptor;
    const contextInterceptor = (context: interfaces.Context) => {
      lookupServiceIdentifiers(context.plan.rootRequest, ServiceIdentifiers);
      return nextContextInterceptor(context);
    };
    const result = planAndResolve({
      ...args,
      contextInterceptor,
    });
    return result;
  };
}
