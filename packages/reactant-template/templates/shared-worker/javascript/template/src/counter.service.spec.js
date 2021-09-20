import { testBed } from 'reactant-share';
import { CounterService } from './counter.service';

describe('CounterService', () => {
  let module;

  beforeEach(() => {
    module = testBed({
      main: CounterService,
      modules: [],
    }).instance;
  });

  test('should be created', () => {
    expect(module instanceof CounterService).toBeTruthy();
  });
});
