import { App, applyPatches, Container, containerKey } from 'reactant';
import { LastAction } from 'reactant-last-action';
import { Transports } from './interfaces';
import { lastActionName, proxyClientActionName } from './constants';
import { PortDetector } from './port';

export const proxyClient = ({
  module,
  method,
  args,
  clientTransport,
}: {
  module: string;
  method: string;
  args: any[];
  clientTransport: Transports['client'];
}) => {
  if (clientTransport) {
    return clientTransport.emit(proxyClientActionName, {
      module,
      method,
      args,
    });
  }
  return Promise.reject(
    new Error(`Detected that the current port is not a client.`)
  );
};

export const handleClient = ({
  app,
  transport,
  disposeServer,
}: {
  app: App<any>;
  transport: Transports['client'];
  disposeServer?: () => void;
}) => {
  if (!transport) {
    throw new Error(`The client transport does not exist.`);
  }
  disposeServer?.();
  const container: Container = app.instance[containerKey];
  const portDetector = container.get(PortDetector);
  portDetector.setPort({ client: app }, transport);
  const disposeListeners: ((() => void) | undefined)[] = [];
  disposeListeners.push(
    transport.listen(lastActionName, async (options) => {
      const lastAction = container.get(LastAction);
      if (options._sequence && options._sequence === lastAction.sequence + 1) {
        const state = applyPatches(app.store!.getState(), options._patches!);
        app.store!.dispatch({ ...options, state });
        lastAction.sequence = options._sequence;
      } else {
        portDetector.syncFullState();
      }
    })
  );
  disposeListeners.push(() => transport.dispose());
  return () => {
    for (const dispose of disposeListeners) {
      dispose?.();
    }
  };
};
