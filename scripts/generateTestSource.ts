/* eslint-disable no-bitwise */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-expressions */
import { writeFileSync } from 'fs';

const classAmount = 500;
const oneClassReducerAmount = 20;
const computedTime = (800 / classAmount) | 0; // 1000 -> Run out of memory

const source = `
// @ts-nocheck
console.log('Initial memory usage:', process.memoryUsage());
let rss = process.memoryUsage().rss;
import React from 'react';
import { render } from 'reactant-web';
import { injectable, action, computed, selector, createApp, View } from '..';
let time = Date.now();
@injectable()
class Service0 {
  state = {
    test0: 0,
  };

  name = 'Service0';

  get props() {
    return {
      sum: this.getSum(),
    };
  }

  @action
  decrease() {
    this.state.test0 -= 1;
  }

  @computed
  getSum() {
    return selector(
      () => this.state.test0,
      test0 => {
        return test0;
      }
    );
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

  state = {
    ${(() => {
      let stateStr = '';
      for (let j = 0; j < oneClassReducerAmount; j+=1) {
        stateStr += `
          test${j}: ${j},
        `;
      }
      return stateStr;
    })()}
  };

  get props() {
    return {
      sum: this.getSum(),
    };
  }

  @action
  decrease() {
    this.state.test0 -= 1;
  }

  @computed
  getSum() {
    return selector(
      () => this.service${i - 1}.props.sum,
      ${(() => {
        let stateStr = '';
        for (let j = 0; j < oneClassReducerAmount; j+=1) {
          stateStr += `
            () => this.state.test${j},
          `;
        }
        return stateStr;
      })()}
      (service${i - 1}
        ${(() => {
          let stateStr = '';
          for (let j = 0; j < oneClassReducerAmount; j+=1) {
            stateStr += `
              , test${j}
            `;
          }
          return stateStr;
        })()}
      ) => {
        return service${i - 1}
        ${(() => {
          let stateStr = '';
          for (let j = 0; j < oneClassReducerAmount; j+=1) {
            stateStr += `
              + test${j}
            `;
          }
          return stateStr;
        })()}
        ;
      }
    );
  }
}
    `;
  }
  return classStr;
})()}

@injectable()
class App extends View {
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
});
console.log('boostrap time:', Date.now() - time);
time = Date.now();
${(() => {
  let computedStr = '';
  for (let i = 0; i < computedTime; i+=1) {
    computedStr += `
      app.instance.service0.decrease();
      app.instance.props.sum;
    `;
  }
  return computedStr;
})()}
console.log('computed time:', Date.now() - time);
console.log('Final memory usage:', process.memoryUsage());
console.log('Memory Usage:', (process.memoryUsage().rss - rss) / (1024 * 1024), 'M')
`;

writeFileSync('./packages/reactant/test/performance.tsx', source);
