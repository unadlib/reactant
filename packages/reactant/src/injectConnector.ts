import { FC } from 'react';
import { ViewModule } from 'reactant-module';
import { createConnector } from './createConnector';

export function injectConnector(service: object | ViewModule) {
  if (service instanceof ViewModule) {
    const component: FC = createConnector(service);
    component.defaultProps = service.defaultAttrs;
    Object.assign(service, {
      component,
    });
  }
}
