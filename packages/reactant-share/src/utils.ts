export const createId = () => Math.random().toString(36).slice(2);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const isSharedWorker = !!globalThis.SharedWorkerGlobalScope;
