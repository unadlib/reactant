import { ComponentElement } from 'react';
import { render } from 'react-dom';
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
}

function createApp({ modules, main }: Config) {
  let instance: void | View;
  const moduleInstances: Module<any>[] = [];
  for (const Module of modules) {
    // TODO di
    const moduleInstance = new Module(moduleInstances[0]);
    moduleInstances.push(moduleInstance);
    if (main === Module) {
      instance = moduleInstance;
    }
  }
  return {
    instance,
    bootstrap(dom: Element): Element {
      if (typeof instance === 'undefined') {
        throw new Error('`main` module has not a valid instance.');
      }
      return renderApp(instance.component, dom);
    },
  };
}

export { createApp };
