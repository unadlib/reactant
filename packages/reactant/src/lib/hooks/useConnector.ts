import { useSelector } from 'react-redux';
import { areStatePropsEqual } from 'reactant-module';

type ShallowEqual = (a: Record<string, any>, b: Record<string, any>) => boolean;

export function useConnector<T>(
  selector: () => T,
  shallowEqual?: ShallowEqual
) {
  return useSelector(selector, shallowEqual || areStatePropsEqual) as T;
}
