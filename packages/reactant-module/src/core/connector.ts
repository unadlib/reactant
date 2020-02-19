import { connect as connectWithRedux } from 'react-redux';
import { View } from './view';
import { areStatePropsEqual } from '../utils';

export function createConnector(service: View) {
  return connectWithRedux(() => service.props, undefined, undefined, {
    areStatePropsEqual,
  })(service.component);
}
