/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable consistent-return */
import { App, containerKey, Container } from 'reactant';
import { LastAction } from 'reactant-last-action';
import { Transports } from './interfaces';
import {
  isClientName,
  lastActionName,
  loadFullStateActionName,
  preloadedStateActionName,
  proxyClientActionName,
} from './constants';
import { PortDetector } from './port';
import { proxy } from './proxy';

export const handleServer = ({
  app,
  transport,
  disposeClient,
}: {
  app: App<any>;
  transport: Transports['server'];
  disposeClient?: () => void;
}) => {
  if (!transport) {
    throw new Error(`The server transport does not exist.`);
  }
  disposeClient?.();
  const container: Container = app.instance[containerKey];
  const portDetector = container.get(PortDetector);
  portDetector.setPort({ server: app }, transport);
  const disposeListeners: ((() => void) | undefined)[] = [];
  disposeListeners.push(transport.listen(isClientName, async () => true));
  disposeListeners.push(
    transport.listen(preloadedStateActionName, async () =>
      app.store?.getState()
    )
  );
  disposeListeners.push(
    transport.listen(loadFullStateActionName, async () => app.store?.getState())
  );
  disposeListeners.push(
    transport.listen(proxyClientActionName, async (options) => {
      const result = await proxy(app, options);
      return result;
    })
  );
  disposeListeners.push(() => transport.dispose());
  disposeListeners.push(
    app.store?.subscribe(() => {
      const {
        lastAction: { _inversePatches: _, ...lastAction },
      } = container.get(LastAction);
      if (lastAction) {
        transport.emit({ name: lastActionName, respond: false }, lastAction);
      }
    })
  );
  return () => {
    for (const dispose of disposeListeners) {
      dispose?.();
    }
  };
};
