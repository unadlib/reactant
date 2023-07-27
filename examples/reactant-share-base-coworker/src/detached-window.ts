import { render } from 'reactant-web';
import { createSharedApp } from 'reactant-share';
import { TodoListView } from './todoList.view';

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
    name: 'SharedWorkerApp',
    type: 'Base',
    workerURL: 'worker.bundle.js',
    enablePatchesFilter: true,
  },
}).then((app) => {
  console.log(app, '====');
  (window as any).app = app;
  app.bootstrap(document.getElementById('app'));
});
