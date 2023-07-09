import { injectable, action, state, Storage, optional } from 'reactant-share';

@injectable({
  name: 'ProxyCounter1',
})
export class ProxyCounter1 {
  @state
  count = 0;
}

@injectable({
  name: 'ProxyCounter',
})
export class ProxyCounter {
  constructor(
    protected proxyCounter1: ProxyCounter1,
    @optional() protected storage?: Storage
  ) {
    // this.storage?.setStorage(this, {
    //   whitelist: ['count'],
    // });
  }

  @state
  count = 0;

  @action
  increase() {
    console.log('increase');
    this.count += 1;
    // it will not work with checker
    this.proxyCounter1.count += 1;
  }

  @action
  decrease() {
    console.log('decrease');
    this.count -= 1;
  }

  @state
  count1 = 0;

  @action
  increase1() {
    console.log('increase1');
    this.count1 += 1;
  }

  @action
  decrease1() {
    console.log('decrease1');
    this.count1 -= 1;
  }
}
