import { connect as connectWithRedux } from 'react-redux';
import { View, areStatePropsEqual } from 'reactant-module';

export function createConnector(service: View) {
  return connectWithRedux(
    (_, ownProps) => {
      // eslint-disable-next-line no-param-reassign
      service.attrs = ownProps;
      return service.props;
    },
    undefined,
    undefined,
    {
      areStatePropsEqual,
    }
  )(service.component);
}
