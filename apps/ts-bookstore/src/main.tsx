import React from 'react';

import localForage from 'localforage';
import { createApp } from 'reactant';
import { Router } from 'reactant-router';
import { IStorageOptions, Storage, StorageOptions } from 'reactant-storage';
import { render } from 'reactant-web';

import { HomeView } from './app/views';

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

app.bootstrap(document.getElementById('root'));
