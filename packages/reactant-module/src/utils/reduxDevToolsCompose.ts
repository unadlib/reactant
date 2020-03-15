import { compose } from 'redux';

const reduxDevToolsCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

export const getComposeEnhancers = (reduxDevTools: boolean) => {
  return typeof reduxDevToolsCompose === 'function' && reduxDevTools
    ? reduxDevToolsCompose({
        serialize: true,
        actionSanitizer: (action: any) =>
          action._reactant
            ? {
                ...action,
                type: `@@reactant/${action.type}/${action.method}`,
              }
            : action,
      })
    : compose;
};
