import { add } from 'reactant-module';
import { subtract } from '../src';

test('s', () => {
  expect(add(1)).toEqual([1]);
  expect(subtract(1)).toEqual([1]);
});
