import { compose } from 'redux';
import { ReduxDevToolsOptions } from '../interfaces';
import { actionIdentifier } from '../constants';

export const getComposeEnhancers = (
  enableReduxDevTools: boolean,
  reduxDevToolsOptions?: ReduxDevToolsOptions
) => {
  try {
    const reduxDevToolsCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    return typeof reduxDevToolsCompose === 'function' && enableReduxDevTools
      ? reduxDevToolsCompose({
          serialize: true,
          actionSanitizer: (action: any) =>
            action._reactant === actionIdentifier
              ? {
                  ...action,
                  type: `@@reactant/${action.type}/${action.method}`,
                }
              : action,
          ...reduxDevToolsOptions,
        })
      : compose;
  } catch (e) {
    return compose;
  }
};
