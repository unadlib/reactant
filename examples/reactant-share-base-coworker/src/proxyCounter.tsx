import { injectable, action, state } from 'reactant-share';

@injectable({
  name: 'ProxyCounter',
})
export class ProxyCounter {
  @state
  count = 0;

  @action
  increase() {
    console.log('increase');
    this.count += 1;
  }

  @action
  decrease() {
    console.log('decrease');
    this.count -= 1;
  }
}
