/* eslint-disable no-param-reassign */
import { Transport } from 'data-transport';
import { actionIdentifier, App, Container, containerKey } from 'reactant';
import { LastAction } from 'reactant-last-action';
import { loadFullStateActionName } from './constants';
import { ClientTransport, ServerTransport } from './interfaces';

let syncFullStatePromise: Promise<Record<string, any>> | null;

export const syncFullState = async ({
  app,
  transport,
}: {
  app: App<any>;
  transport: Transport<ClientTransport, ServerTransport>;
}) => {
  if (syncFullStatePromise) return;
  const container: Container = app.instance[containerKey];
  const lastAction = container.get(LastAction);
  syncFullStatePromise = transport.emit(loadFullStateActionName);
  const fullState = await syncFullStatePromise;
  syncFullStatePromise = null;
  app.store!.dispatch({
    type: `${actionIdentifier}_${loadFullStateActionName}`,
    state: fullState,
    _reactant: actionIdentifier,
  });
  lastAction.sequence = fullState[lastAction.stateKey]._sequence;
};
