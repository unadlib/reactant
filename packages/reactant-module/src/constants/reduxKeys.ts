export const storeKey: unique symbol = Symbol('store');
export const loaderKey: unique symbol = Symbol('loader');
export const subscriptionsKey: unique symbol = Symbol('subscriptions');
export const unsubscriptionsKey: unique symbol = Symbol('unsubscriptions');
export const stateKey: unique symbol = Symbol('state');
export const defaultStateKey: unique symbol = Symbol('defaultState');
export const signalMapKey: unique symbol = Symbol('signalMap');
export const enablePatchesKey: unique symbol = Symbol('enablePatches');
export const enableAutoComputedKey: unique symbol =
  Symbol('enableAutoComputed');
export const enableAutoFreezeKey: unique symbol = Symbol('enableAutoFreeze');
export const strictKey: unique symbol = Symbol('strict');
export const enableInspectorKey: unique symbol = Symbol('enableInspector');
export const checkActionKey: unique symbol = Symbol('checkAction');
export const actionIdentifier = 'REACTANT_ACTION' as const;
