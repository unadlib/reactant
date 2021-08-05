import { CallbackWithHook, Port, PortApp } from './interfaces';

let portApp: PortApp;

let lastHooks: Set<ReturnType<CallbackWithHook>>;

export const detectPort = (port: Port) => !!portApp?.[port];

export const setPort = (
  currentPortApp: PortApp,
  callbacks: Set<CallbackWithHook>
) => {
  if (lastHooks) {
    for (const hook of lastHooks) {
      try {
        hook?.();
      } catch (e) {
        console.error(e);
      }
    }
  }
  lastHooks = new Set();
  portApp = currentPortApp;
  for (const callback of callbacks) {
    try {
      const hook = callback();
      lastHooks.add(hook);
    } catch (e) {
      console.error(e);
    }
  }
};
