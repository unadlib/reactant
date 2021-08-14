/* eslint-disable no-param-reassign */
import { Transport } from 'data-transport';
import { actionIdentifier, App, Container, containerKey } from 'reactant';
import { LastAction } from 'reactant-last-action';
import { loadFullStateActionName } from './constants';
import { ClientTransport, ServerTransport } from './interfaces';

export interface SyncFullStatePromiseRef {
  current: Promise<Record<string, any>> | null;
}

export const syncFullState = async ({
  app,
  transport,
  syncFullStatePromiseRef,
}: {
  app: App<any>;
  transport: Transport<ClientTransport, ServerTransport>;
  syncFullStatePromiseRef: SyncFullStatePromiseRef;
}) => {
  if (syncFullStatePromiseRef.current) return;
  const container: Container = app.instance[containerKey];
  const lastAction = container.get(LastAction);
  syncFullStatePromiseRef.current = transport.emit(loadFullStateActionName);
  const fullState = await syncFullStatePromiseRef.current;
  syncFullStatePromiseRef.current = null;
  app.store!.dispatch({
    type: `${actionIdentifier}_${loadFullStateActionName}`,
    state: fullState,
    _reactant: actionIdentifier,
  });
  lastAction.sequence = fullState[lastAction.stateKey]._sequence;
};
