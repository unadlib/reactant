/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable no-bitwise */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-expressions */
import { writeFileSync } from 'fs';
import yargs from 'yargs';

const argv = yargs.argv as any;

const {
  classAmount = 50,
  oneClassReducerAmount = 10,
  computedTime = (50000 / classAmount) | 0, // 1000 -> Run out of memory
  allCheckedState = true,
} = argv.mode
  ? ({
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
    } as any)[argv.mode]
  : argv;

// const checkedState = allCheckedState ? '' : '(this as any)[storeKey].getState()';
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
global.window = {};
class ViewModule {}
import React from 'react';
let time = Date.now();
const computedTime = ${computedTime};
class Service0 {
  test0 = 0;

  name = 'Service0';

  get props() {
    return {
      sum: this.sum,
    };
  }

  decrease() {
    this.test0 -= 1;
  }

  get sum() {
    return this.test0;
  }
}
const service0 = new Service0();
${(() => {
  let classStr = '';
  for (let i = 1; i < classAmount; i += 1) {
    classStr += `
class Service${i} {
  constructor(public service${i - 1}: Service${i - 1}) {}

  name = 'Service${i}';

    ${(() => {
      let stateStr = '';
      for (let j = 0; j < oneClassReducerAmount; j += 1) {
        stateStr += `
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

  decrease() {
    this.test0 -= 1;
  }

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
const service${i} = new Service${i}(service${i - 1});
    `;
  }
  return classStr;
})()}
const app = {};
class App extends ViewModule {
  constructor(public service${classAmount - 1}: Service${
  classAmount - 1
}, public service0: Service0) {
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
app.instance = new App(service${classAmount - 1}, service0);
console.log('wrap time:', Date.now() - time);
time = Date.now();
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
const computed = Date.now() - time;
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
console.log('Result:', { bootstrap, update: computed, computedGetter: cache });
process.exit();
`;

writeFileSync('./packages/reactant/test/performance.tsx', source);
