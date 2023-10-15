import { injectable, action, state, getCoworker, subscribe } from 'reactant-share';

@injectable({
  name: 'ProxyCounter',
})
export class ProxyCounter {
  constructor() {
    subscribe(this, () => {
      console.log('coworker:', getCoworker(this)?.name);
    });
  }

  @state
  count = 0;

  @action
  increase() {
    console.log('increase', getCoworker(this));
    this.count += 1;
  }

  @action
  decrease() {
    console.log('decrease');
    this.count -= 1;
  }
}
