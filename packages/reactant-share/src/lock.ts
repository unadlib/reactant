type LockName = string;
type LockId = string;
type LockCallBack = (lock: {
  name: string;
  mode: 'exclusive';
}) => Promise<void>;
type LockQueue = { tabId: string; lockId: string }[];

const lockMap: Record<LockName, Record<LockId, LockCallBack>> = {};
const tabId = Math.random().toString(36);
const lockStorageKey = 'reactant:lock';
const tabStorageKey = 'reactant:tab';

const clearTabLocks = (tabIds: string[]) => {
  const keys = Object.keys(localStorage).join(':');
  Object.keys(localStorage).forEach((key) => {
    if (!key.indexOf(lockStorageKey)) {
      const lockQueue: LockQueue = JSON.parse(
        localStorage.getItem(key) ?? '[]'
      );
      localStorage.setItem(
        key,
        JSON.stringify(
          lockQueue.filter(
            (item) =>
              tabIds.indexOf(item.tabId) === -1 && keys.indexOf(item.tabId) > -1
          )
        )
      );
    }
  });
  tabIds.forEach((_tabId) =>
    localStorage.removeItem(`${tabStorageKey}:${_tabId}`)
  );
};

let isListenUnload = false;

const addUnloadListener = () => {
  if (isListenUnload) return;
  isListenUnload = true;
  /**
   * After unload event, It is known that the clear of localStorage in some Firefox scenarios and Safari v10 does not execute properly.
   */
  window.addEventListener('unload', () => {
    clearTabLocks([tabId]);
  });
};

const filterExpiredTabs = () => {
  const expiredTabIds: string[] = [];
  Object.keys(localStorage).forEach((key) => {
    if (!key.indexOf(tabStorageKey)) {
      const timestamp = localStorage.getItem(key);
      if (timestamp && Date.now() - Number(timestamp) > 2100) {
        const expiredTabId = key.replace(`${tabStorageKey}:`, '');
        expiredTabIds.push(expiredTabId);
      }
    }
  });
  return expiredTabIds;
};

let heartbeatTimer: NodeJS.Timeout;

const simpleLock = (name: LockName, callback: LockCallBack) => {
  addUnloadListener();
  // for unload issue
  clearTabLocks(filterExpiredTabs());
  if (typeof heartbeatTimer === 'undefined') {
    const tabHeartbeatKey = `${tabStorageKey}:${tabId}`;
    heartbeatTimer = setInterval(
      () => localStorage.setItem(tabHeartbeatKey, Date.now().toString()),
      1000
    );
  }
  setTimeout(() => {
    const storageKey = `${lockStorageKey}:${name}`;
    const oldStorageValue = localStorage.getItem(storageKey);
    clearTabLocks(filterExpiredTabs());
    window.dispatchEvent(
      Object.assign(new Event('storage'), {
        key: storageKey,
        newValue: localStorage.getItem(storageKey),
        oldValue: oldStorageValue,
      })
    );
  }, 2100); // refresh but no trigger unload event.

  return new Promise((resolve, reject) => {
    const lockId = Math.random().toString(36);
    lockMap[name] ??= {};
    lockMap[name][lockId] = callback;
    const storageKey = `${lockStorageKey}:${name}`;
    const oldStorageValue = localStorage.getItem(storageKey);
    const lockQueue: LockQueue = JSON.parse(oldStorageValue ?? '[]');
    lockQueue.push({ tabId, lockId });
    localStorage.setItem(storageKey, JSON.stringify(lockQueue));

    const listener = async (event: StorageEvent) => {
      if (event.key === storageKey && event.newValue) {
        const [lock]: LockQueue = JSON.parse(event.newValue);
        if (lock?.tabId === tabId && lock?.lockId === lockId) {
          window.removeEventListener('storage', listener);
          try {
            const result = await lockMap[name][lockId]({
              name,
              mode: 'exclusive',
            });
            resolve(result);
          } catch (e) {
            reject(e);
          }
          delete lockMap[name][lockId];
          const currentLockQueue: LockQueue = JSON.parse(
            localStorage.getItem(storageKey) ?? '[]'
          );
          currentLockQueue.splice(0, 1);
          localStorage.setItem(storageKey, JSON.stringify(currentLockQueue));
        }
      }
    };
    window.addEventListener('storage', listener);
    window.dispatchEvent(
      Object.assign(new Event('storage'), {
        key: storageKey,
        newValue: localStorage.getItem(storageKey),
        oldValue: oldStorageValue,
      })
    );
  });
};

export const useLock = (name: LockName, callback: LockCallBack) => {
  const isPrimitiveLock = !!(navigator as any).locks?.request;
  if (isPrimitiveLock) {
    return (navigator as any).locks.request(name, callback);
  }
  return simpleLock(name, callback);
};
