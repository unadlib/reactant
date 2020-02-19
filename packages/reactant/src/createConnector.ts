import { connect as connectWithRedux } from 'react-redux';
import { View, areStatePropsEqual } from 'reactant-module';

export function createConnector(service: View) {
  return connectWithRedux(() => service.props, undefined, undefined, {
    areStatePropsEqual,
  })(service.component);
}
