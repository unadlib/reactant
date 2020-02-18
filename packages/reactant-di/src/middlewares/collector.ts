import { interfaces } from 'inversify';
import { getServiceIdentifiers } from '../util';

function lookupServiceIdentifiers(request: interfaces.Request) {
  if (getServiceIdentifiers().indexOf(request.serviceIdentifier) === -1) {
    getServiceIdentifiers().push(request.serviceIdentifier);
    if (request.childRequests.length === 0) return;
    request.childRequests.forEach(childRequest => {
      lookupServiceIdentifiers(childRequest);
    });
  }
}

export function collector(planAndResolve: interfaces.Next): interfaces.Next {
  return (args: interfaces.NextArgs) => {
    const nextContextInterceptor = args.contextInterceptor;
    const contextInterceptor = (context: interfaces.Context) => {
      lookupServiceIdentifiers(context.plan.rootRequest);
      return nextContextInterceptor(context);
    };
    const result = planAndResolve({
      ...args,
      contextInterceptor,
    });
    return result;
  };
}
