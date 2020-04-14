import { compose } from 'redux';

export const getComposeEnhancers = (reduxDevTools: boolean) => {
  // TODO: fix typedoc type error.
  const reduxDevToolsCompose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
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
