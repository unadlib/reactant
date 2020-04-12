import React from 'react';
import { render } from 'reactant-web';
import { createApp } from 'reactant';
import {
  StorageOptions,
  localStorage,
  IStorageOptions,
} from 'reactant-storage';
import { HomeView } from './views/home';

const app = createApp({
  modules: [
    {
      provide: StorageOptions,
      useValue: {
        whitelist: [],
        storage: localStorage,
        loading: <div>loading</div>,
      } as IStorageOptions,
    },
  ],
  main: HomeView,
  render,
  devOptions: {
    reduxDevTools: true,
  },
});

app.bootstrap(document.getElementById('app'));

window.app = app;
