/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable no-bitwise */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-expressions */
import { writeFileSync } from 'fs';
import { argv } from 'yargs';

const {
  classAmount = 50,
  oneClassReducerAmount = 10,
  computedTime = (50000 / classAmount) | 0, // 1000 -> Run out of memory
  allCheckedState = true,
} = argv.mode
  ? {
      small: {
        classAmount: 100,
        oneClassReducerAmount: 20,
        computedTime: 1000,
        allCheckedState: true,
      },
      big: {
        classAmount: 200,
        oneClassReducerAmount: 30,
        computedTime: 1000,
        allCheckedState: true,
      },
      huge: {
        classAmount: 300,
        oneClassReducerAmount: 100,
        computedTime: 1000,
        allCheckedState: true,
      },
      // @ts-ignore
    }[argv.mode]
  : (argv as any);

const checkedState = allCheckedState
  ? ''
  : '(this as any)[storeKey].getState()';
const source = `
// @ts-nocheck
process.env.NODE_ENV = 'production';
console.log('mode:', ${JSON.stringify(argv.mode)});
console.log(${JSON.stringify({
  classAmount,
  oneClassReducerAmount,
  computedTime,
  allCheckedState,
})});
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}
global.window = {};
import React from 'react';
import { render } from 'reactant-web';
import { observable, action, computed } from 'mobx';
import { injectable, createApp, ViewModule, createSelector, storeKey } from '..';
let time = Date.now();
const computedTime = ${computedTime};
@injectable()
class Service0 {
  @observable
  test0 = 0;

  name = 'Service0';

  get props() {
    return {
      sum: this.sum,
    };
  }

  @action
  decrease() {
    this.test0 -= 1;
  }

  @computed
  get sum() {
    return this.test0;
  }
}

${(() => {
  let classStr = '';
  for (let i = 1; i < classAmount; i += 1) {
    classStr += `
@injectable()
class Service${i} {
  constructor(public service${i - 1}: Service${i - 1}) {}

  name = 'Service${i}';

    ${(() => {
      let stateStr = '';
      for (let j = 0; j < oneClassReducerAmount; j += 1) {
        stateStr += `
          @observable
          test${j} = ${j};
        `;
      }
      return stateStr;
    })()}

  get props() {
    return {
      sum: this.sum,
    };
  }

  @action
  decrease() {
    this.test0 -= 1;
  }

  @computed
  get sum() {
    return (this.service${i - 1}.props.sum
    ${(() => {
      let stateStr = '';
      for (let j = 0; j < oneClassReducerAmount; j += 1) {
        stateStr += `
          + this.test${j}
        `;
      }
      return stateStr;
    })()}
    );
  }
}
    `;
  }
  return classStr;
})()}

@injectable()
class App extends ViewModule {
  constructor(public service${classAmount - 1}: Service${classAmount -
  1}, public service0: Service0) {
    super();
  }

  get props() {
    return {
      sum: this.service${classAmount - 1}.props.sum,
    };
  }

  component() {
    return <></>;
  }
}
console.log('wrap time:', Date.now() - time);
time = Date.now();
const app = createApp({
  main: App,
  render,
  devOptions: {
    autoFreeze: false,
    reduxDevTools: false,
  },
});
const bootstrap = Date.now() - time;
time = Date.now();
${(() => {
  let computedStr = '';
  for (let i = 0; i < computedTime; i += 1) {
    computedStr += `
      app.instance.service0.decrease();
      app.instance.props.sum;
    `;
  }
  return computedStr;
})()}
const computedTime = Date.now() - time;
time = Date.now();
${(() => {
  let computedStr = '';
  for (let i = 0; i < computedTime; i += 1) {
    computedStr += `
      app.instance.props.sum;
    `;
  }
  return computedStr;
})()}
const cache = Date.now() - time;
console.log('Result:', { bootstrap, computed: computedTime, cache });
`;

writeFileSync('./packages/reactant/test/performance.tsx', source);
