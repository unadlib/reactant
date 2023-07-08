export {};

declare global {
  declare const __DEV__: boolean;
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    app: any;
  }
}
