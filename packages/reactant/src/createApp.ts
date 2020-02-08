import { ComponentElement } from 'react';
import { render } from 'react-dom';
import { View } from 'reactant-module';

function renderApp(element: ComponentElement<any, any>, container: Element) {
  return render(element, container);
}

interface Module {
  new (): any;
}

interface IConfig {
  modules: Module[];
  main: Module;
}

function createApp({ modules, main }: IConfig) {
  let instance: View;
  for (const Module of modules) {
    const module = new Module();
    if (main === Module) {
      instance = module;
    }
  }
  return {
    instance,
    bootstrap(dom) {
      return renderApp(instance.component, dom);
    },
  };
}

export { createApp };
