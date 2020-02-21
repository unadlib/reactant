import { FC } from 'react';
import { View } from 'reactant-module';
import { createConnector } from './createConnector';

export function injectConnector(service: object | View) {
  if (service instanceof View) {
    const component: FC = createConnector(service);
    component.defaultProps = service.defaultAttrs;
    Object.assign(service, {
      component,
    });
  }
}
