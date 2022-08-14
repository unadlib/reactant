import { createId } from './utils';

type LockName = string;
type LockId = string;
type LockCallBack = (lock: {
  name: string;
  mode: 'exclusive';
}) => Promise<void>;
type LockQueue = { tabId: string; lockId: string }[];

const lockMap: Map<LockName, Map<LockId, LockCallBack>> = new Map();
const tabId = createId();
const lockStorageKey = 'reactant:lock';
const tabStorageKey = 'reactant:tab';
let heartbeatTimer: number;
let isListenUnload = false;
let storage: Storage;

const clearTabLocks = (tabIds: string[], _storage: Storage) => {
  if (tabIds.length === 0) return;
  Object.keys(localStorage).forEach((key) => {
    if (!key.indexOf(lockStorageKey)) {
      const lockQueue: LockQueue = JSON.parse(
        localStorage.getItem(key) ?? '[]'
      );
      const newValue = JSON.stringify(
        lockQueue.filter(
          (item) => tabIds.indexOf(item.tabId) === -1
          // && localStorage.getItem(`${tabStorageKey}:${item.tabId}`)
        )
      );
      _storage.setItem(key, newValue);
    }
  });
  tabIds.forEach((_tabId) => _storage.removeItem(`${tabStorageKey}:${_tabId}`));
};

const addUnloadListener = () => {
  if (isListenUnload) return;
  isListenUnload = true;
  /**
   * After unload event, It is known that the clear of localStorage in some Firefox scenarios and Safari v10 does not execute properly.
   */
  window.addEventListener('unload', () => {
    clearTabLocks([tabId], localStorage);
  });
};

const filterInvalidTabs = () => {
  const invalidTabIds: string[] = [];
  Object.keys(localStorage).forEach((key) => {
    if (!key.indexOf(tabStorageKey)) {
      const timestamp = localStorage.getItem(key);
      // TODO: think about Wakeup
      // Maximum is thread lock for 1 second + 1.99 second.
      if (timestamp && Date.now() - Number(timestamp) > 2999) {
        const expiredTabId = key.replace(`${tabStorageKey}:`, '');
        invalidTabIds.push(expiredTabId);
      }
    } else if (!key.indexOf(lockStorageKey)) {
      const lockQueue: LockQueue = JSON.parse(
        localStorage.getItem(key) ?? '[]'
      );
      lockQueue.forEach((item) => {
        if (!localStorage.getItem(`${tabStorageKey}:${item.tabId}`)) {
          invalidTabIds.push(item.tabId);
        }
      });
    }
  });
  return invalidTabIds;
};

const heartbeat = () => {
  if (typeof heartbeatTimer === 'undefined') {
    const tabHeartbeatKey = `${tabStorageKey}:${tabId}`;
    storage.setItem(tabHeartbeatKey, Date.now().toString());
    heartbeatTimer = window.setInterval(
      () => storage.setItem(tabHeartbeatKey, Date.now().toString()),
      1000
    );
  }
};

const createFrameStorage = () => {
  const iframe = document.createElement('iframe');
  iframe.src = 'about:blank';
  iframe.setAttribute('style', 'display: none;');
  document.body.appendChild(iframe);
  storage = iframe!.contentWindow!.localStorage;
};

const simpleLock = (name: LockName, callback: LockCallBack) => {
  createFrameStorage();
  addUnloadListener();
  heartbeat();

  return new Promise((resolve, reject) => {
    const lockId = createId();
    lockMap.set(name, lockMap.get(name) ?? new Map());
    lockMap.get(name)!.set(lockId, callback);
    const storageKey = `${lockStorageKey}:${name}`;
    const oldStorageValue = localStorage.getItem(storageKey);
    const lockQueue: LockQueue = JSON.parse(oldStorageValue ?? '[]');
    lockQueue.push({ tabId, lockId });
    const listener = async (event: StorageEvent) => {
      if (event.key === storageKey && event.newValue) {
        const [lock]: LockQueue = JSON.parse(event.newValue);
        if (lock?.tabId === tabId && lock?.lockId === lockId) {
          window.removeEventListener('storage', listener);
          try {
            const result = await lockMap.get(name)!.get(lockId)!({
              name,
              mode: 'exclusive',
            });
            resolve(result);
          } catch (e) {
            reject(e);
          }
          lockMap.get(name)!.delete(lockId);
          const currentLockQueue: LockQueue = JSON.parse(
            localStorage.getItem(storageKey) ?? '[]'
          );
          currentLockQueue.splice(0, 1);
          storage.setItem(storageKey, JSON.stringify(currentLockQueue));
        }
      }
    };
    window.addEventListener('storage', listener);
    storage.setItem(storageKey, JSON.stringify(lockQueue));
    clearTabLocks(filterInvalidTabs(), storage);
  });
};

export const useLock = (name: LockName, callback: LockCallBack) => {
  const isPrimitiveLock = !!(navigator as any).locks?.request;
  if (isPrimitiveLock) {
    return (navigator as any).locks.request(name, callback);
  }
  return simpleLock(name, callback);
};
