import { injectable, action, state, proxify } from 'reactant-share';

@injectable()
class CounterService {
  name = 'counter';

  @state
  count = 0;

  @action
  _increase() {
    this.count += 1;
  }

  @action
  _decrease() {
    this.count -= 1;
  }

  @proxify
  async increase() {
    this._increase();
  }

  @proxify
  async decrease() {
    this._decrease();
  }
}

export { CounterService };
