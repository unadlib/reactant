export class MemoryStorage {
  constructor(public data: Record<string, any> = {}) {}

  getItem(key: string): Promise<string> {
    return new Promise((resolve) => {
      resolve(this.data[key]);
    });
  }

  setItem(key: string, item: string) {
    return new Promise((resolve) => {
      this.data[key] = item;
      resolve(undefined);
    });
  }

  removeItem(key: string) {
    return new Promise((resolve) => {
      delete this.data[key];
      resolve(undefined);
    });
  }
}
