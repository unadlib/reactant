import { Store } from 'redux';

let store: Store;

export const getStore = (): Store => store;

export const setStore = (newStore: Store) => {
  store = newStore;
};
