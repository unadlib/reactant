import { injectable, action, state, proxy } from 'reactant-share';

@injectable({
  name: 'counter',
})
class CounterService {
  @state
  count = 0;

  @action
  increase() {
    this.count += 1;
  }

  @action
  decrease() {
    this.count -= 1;
  }
}

export { CounterService };
