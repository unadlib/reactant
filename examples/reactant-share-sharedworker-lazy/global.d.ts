/* eslint-disable no-var */
/* eslint-disable vars-on-top */
export {};

declare global {
  declare const __DEV__: boolean;
  declare const self: { app: any };
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    app: any;
  }

  var __worker__: SharedWorker;

  declare module '*.css' {
    export default {} as Record<string, any>;
  }
}
