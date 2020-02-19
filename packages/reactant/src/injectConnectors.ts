import { FC } from 'react';
import { ServiceIdentifier, Container, View } from 'reactant-module';
import { createConnector } from './createConnector';

export function injectConnectors(
  container: Container,
  serviceIdentifiers: ServiceIdentifier<any>[]
) {
  for (const serviceIdentifier of serviceIdentifiers) {
    const service: View = container.get(serviceIdentifier);
    const component: FC = createConnector(service);
    component.defaultProps = service.defaultAttrs;
    service.component = component as any;
  }
}
