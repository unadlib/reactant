import React, { ComponentElement } from 'react';
import { render, Renderer } from 'react-dom';
import { createContainer, ContainerOptions } from 'reactant-module';

function renderApp(
  element: ComponentElement<any, any>,
  container: Element
): Element {
  return render(element, container);
}

interface Module<T> extends Function {
  new (...args: any[]): T;
}

interface Config<T> {
  modules: Module<any>[];
  main: Module<T>;
  render?: Renderer;
  containerOptions?: ContainerOptions;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppProps {
  // version: string;
}

// eslint-disable-next-line no-shadow
function createApp<T>({ modules, main, render, containerOptions }: Config<T>) {
  const instance = createContainer(containerOptions).get(main);
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
