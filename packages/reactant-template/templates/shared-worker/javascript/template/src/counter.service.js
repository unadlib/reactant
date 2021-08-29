import { injectable, action, state, proxy } from 'reactant-share';

@injectable({
  name: 'counter',
})
class CounterService {
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

  @proxy
  async increase() {
    this._increase();
  }

  @proxy
  async decrease() {
    this._decrease();
  }
}

export { CounterService };
