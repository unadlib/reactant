import React from 'react';
import { render } from 'reactant-web';
import {
  ViewModule,
  createApp,
  injectable,
  useConnector,
  action,
  state,
} from 'reactant';

@injectable()
class PhoneService {
  @state
  phoneNumber = '';

  @action
  inputDigit(digit: string) {
    this.phoneNumber += digit;
  }

  @action
  clear() {
    this.phoneNumber = '';
  }

  @action
  call() {
    alert(`Calling ${this.phoneNumber}...`);
    this.clear(); // Clear the number after calling
  }
}

@injectable()
class PhoneApp extends ViewModule {
  constructor(public phoneService: PhoneService) {
    super();
  }

  component() {
    const phoneNumber = useConnector(() => this.phoneService.phoneNumber);
    return (
      <div>
        <h1>Phone Dialer</h1>
        <div style={{ fontSize: '24px', marginBottom: '20px' }}>
          {phoneNumber}
        </div>
        <div>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map(
            (digit) => (
              <button
                key={digit}
                onClick={() => this.phoneService.inputDigit(digit)}
                style={{ width: '60px', height: '60px', margin: '5px' }}
              >
                {digit}
              </button>
            )
          )}
        </div>
        <button
          onClick={() => this.phoneService.call()}
          style={{ marginTop: '20px' }}
        >
          Call
        </button>
        <button
          onClick={() => this.phoneService.clear()}
          style={{ marginTop: '20px', marginLeft: '10px' }}
        >
          Clear
        </button>
      </div>
    );
  }
}

const app = createApp({
  main: PhoneApp,
  modules: [],
  render,
});

app.bootstrap(document.getElementById('root'));
