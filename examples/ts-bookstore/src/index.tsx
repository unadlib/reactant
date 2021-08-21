import React from 'react';
import { render } from 'reactant-web';
import { createApp } from 'reactant';
import localForage from 'localforage';
import {
  StorageOptions,
  // localStorage,
  IStorageOptions,
  Storage,
} from 'reactant-storage';
import { Router } from 'reactant-router';
import { HomeView } from './views';

const app = createApp({
  modules: [
    Router,
    Storage,
    {
      provide: StorageOptions,
      useValue: {
        // whitelist: [],
        // storage: localStorage,
        storage: localForage,
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
