import { injectable, action, state } from 'reactant';

@injectable()
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
