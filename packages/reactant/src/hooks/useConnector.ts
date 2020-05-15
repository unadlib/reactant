import { useSelector } from 'react-redux';
import { areStatePropsEqual } from 'reactant-module';

import { ShallowEqual } from '../interfaces';

export function useConnector<T>(
  selector: () => T,
  shallowEqual?: ShallowEqual
) {
  return useSelector(selector, shallowEqual || areStatePropsEqual) as T;
}
