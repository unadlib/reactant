import { render } from 'reactant-web';
import { createSharedApp } from 'reactant-share';
import { TodoListView } from './modules/todoList.view';

createSharedApp({
  modules: [
    {
      provide: 'TodoListViewOptions',
      useValue: {
        isDetachedWindow: true,
      },
    },
  ],
  main: TodoListView,
  render,
  share: {
    name: 'SharedApp',
    type: 'SharedTab',
    port: 'client',
  },
}).then((app) => {
  console.log(app, '====');
  window.app = app;
  app.bootstrap(document.getElementById('app'));
});
