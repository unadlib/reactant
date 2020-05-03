import { render } from 'reactant-web';
import { createApp } from 'reactant';
import { AppView } from './app.view';

const app = createApp({
  modules: [],
  main: AppView,
  render,
});

app.bootstrap(document.getElementById('app'));
