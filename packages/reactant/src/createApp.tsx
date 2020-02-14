import React, { ComponentElement } from 'react';
import { render, Renderer } from 'react-dom';
import { View } from 'reactant-module';

function renderApp(
  element: ComponentElement<any, any>,
  container: Element
): Element {
  return render(element, container);
}

interface Module<T> extends Function {
  new (...args: any[]): T;
}

interface Config {
  modules: Module<any>[];
  main: Module<any>;
  render?: Renderer;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppProps {
  // version: string;
}

// eslint-disable-next-line no-shadow
function createApp({ modules, main, render }: Config) {
  let instance: void | View<any, AppProps>;
  const moduleInstances: Module<any>[] = [];
  for (const Module of modules) {
    // TODO di
    if (main === Module) {
      const moduleInstance = new Module(...moduleInstances);
      instance = moduleInstance;
      moduleInstances.push(moduleInstance);
    } else {
      const moduleInstance = new Module(moduleInstances[0]);
      moduleInstances.push(moduleInstance);
    }
  }
  return {
    instance,
    bootstrap(dom: Element): Element | void {
      if (typeof instance === 'undefined') {
        throw new Error('`main` module has not a valid instance.');
      }
      const element = <instance.component />;
      if (typeof render === 'function') {
        return render(element, dom);
      }
      return renderApp(element, dom);
    },
  };
}

export { createApp };
