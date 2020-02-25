import { connect as connectWithRedux } from 'react-redux';
import { ViewModule, areStatePropsEqual } from 'reactant-module';

export function createConnector(service: ViewModule) {
  const component = service.component.bind(service);
  Object.assign(component, {
    defaultProps: service.defaultAttrs,
  });
  Object.assign(service, {
    component,
  });
  return connectWithRedux(
    (_, ownProps) => {
      Object.assign(service, {
        attrs: ownProps,
      });
      return service.props;
    },
    undefined,
    undefined,
    {
      areStatePropsEqual,
    }
  )(service.component);
}
