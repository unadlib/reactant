import { useSelector } from 'react-redux';
import { areShallowEqualWithObject } from 'reactant-module';
import { ShallowEqual } from '../interfaces';

export function useConnector<T>(
  selector: () => T,
  shallowEqual?: ShallowEqual
) {
  return useSelector(selector, shallowEqual || areShallowEqualWithObject) as T;
}
