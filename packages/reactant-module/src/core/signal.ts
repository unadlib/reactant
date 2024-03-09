/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-bitwise */
/* eslint-disable no-use-before-define */
const RUNNING = 1 << 0;
const NOTIFIED = 1 << 1;
const OUTDATED = 1 << 2;
const HAS_ERROR = 1 << 4;
const TRACKING = 1 << 5;

interface ExternalSignal<T = unknown> {
  value: T;
}

interface ExternalComputed<T = unknown> extends ExternalSignal<T> {
  readonly value: T;
}

interface Node {
  _source: Signal;
  _prevSource?: Node;
  _nextSource?: Node;
  _target: Computed;
  _prevTarget?: Node;
  _nextTarget?: Node;
  _version: number;
  _rollbackNode?: Node;
}

let evalContext: Computed | undefined;

let globalVersion = 0;

let untrackedDepth = 0;

const untracked = <T>(callback: () => T): T => {
  if (untrackedDepth > 0) {
    return callback();
  }
  const prevContext = evalContext;
  evalContext = undefined;
  untrackedDepth += 1;
  try {
    return callback();
  } finally {
    untrackedDepth -= 1;
    evalContext = prevContext;
  }
};

class Signal<T = unknown> {
  _version = 0;

  _node?: Node;

  _targets?: Node;

  _value?: T;

  constructor(value?: T) {
    this._value = value;
  }

  _refresh() {
    return true;
  }

  get value() {
    const node = this.addDependency();
    if (node !== undefined) {
      node._version = this._version;
    }
    return this._value;
  }

  set value(value) {
    if (evalContext instanceof Computed) {
      throw new Error('Computed cannot have side-effects');
    }
    if (value !== this._value) {
      this._value = value;
      this._version += 1;
      globalVersion += 1;
    }
  }

  addDependency(): Node | undefined {
    if (evalContext === undefined) {
      return;
    }

    let node = this._node;
    if (node === undefined || node._target !== evalContext) {
      node = {
        _version: 0,
        _source: this,
        _prevSource: evalContext._sources,
        _nextSource: undefined,
        _target: evalContext,
        _prevTarget: undefined,
        _nextTarget: undefined,
        _rollbackNode: node,
      };
      if (evalContext._sources !== undefined) {
        evalContext._sources._nextSource = node;
      }
      evalContext._sources = node;
      this._node = node;
      return node;
    } else if (node._version === -1) {
      node._version = 0;
      if (node._nextSource !== undefined) {
        node._nextSource._prevSource = node._prevSource;

        if (node._prevSource !== undefined) {
          node._prevSource._nextSource = node._nextSource;
        }
        node._prevSource = evalContext._sources;
        node._nextSource = undefined;
        evalContext._sources!._nextSource = node;
        evalContext._sources = node;
      }
      return node;
    }
  }
}

const signal = <T>(value: T) => new Signal(value) as ExternalSignal<T>;

class Computed<T = unknown> extends Signal<T> {
  _compute: () => T;

  _sources?: Node;

  _globalVersion = globalVersion - 1;

  _flags: number;

  constructor(compute: () => T) {
    super(undefined);
    this._compute = compute;
    this._flags = OUTDATED;
  }

  _refresh() {
    this._flags &= ~NOTIFIED;

    if (this._flags & RUNNING) {
      return false;
    }
    if ((this._flags & (OUTDATED | TRACKING)) === TRACKING) {
      return true;
    }
    this._flags &= ~OUTDATED;

    if (this._globalVersion === globalVersion) {
      return true;
    }
    this._globalVersion = globalVersion;
    this._flags |= RUNNING;
    if (this._version > 0 && !this.needsToRecompute()) {
      this._flags &= ~RUNNING;
      return true;
    }

    const prevContext = evalContext;
    try {
      this.prepareSources();
      evalContext = this;
      const value = this._compute();
      if (
        this._flags & HAS_ERROR ||
        this._value !== value ||
        this._version === 0
      ) {
        this._value = value;
        this._flags &= ~HAS_ERROR;
        this._version += 1;
      }
    } catch (err) {
      this._value = err as T;
      this._flags |= HAS_ERROR;
      this._version += 1;
    }
    evalContext = prevContext;
    this.cleanupSources();
    this._flags &= ~RUNNING;
    return true;
  }

  get value() {
    if (this._flags & RUNNING) {
      throw new Error('Cycle detected');
    }
    const node = this.addDependency();
    this._refresh();
    if (node !== undefined) {
      node._version = this._version;
    }
    if (this._flags & HAS_ERROR) {
      throw this._value;
    }
    return this._value;
  }

  needsToRecompute() {
    for (
      let node = this._sources;
      node !== undefined;
      node = node._nextSource
    ) {
      if (
        node._source._version !== node._version ||
        !node._source._refresh() ||
        node._source._version !== node._version
      ) {
        return true;
      }
    }
    return false;
  }

  prepareSources() {
    for (
      let node = this._sources;
      node !== undefined;
      node = node._nextSource
    ) {
      const rollbackNode = node._source._node;
      if (rollbackNode !== undefined) {
        node._rollbackNode = rollbackNode;
      }
      node._source._node = node;
      node._version = -1;

      if (node._nextSource === undefined) {
        this._sources = node;
        break;
      }
    }
  }

  cleanupSources() {
    let node = this._sources;
    let head: Node | undefined;
    while (node !== undefined) {
      const prev = node._prevSource;
      if (node._version === -1) {
        if (prev !== undefined) {
          prev._nextSource = node._nextSource;
        }
        if (node._nextSource !== undefined) {
          node._nextSource._prevSource = prev;
        }
      } else {
        head = node;
      }

      node._source._node = node._rollbackNode;
      if (node._rollbackNode !== undefined) {
        node._rollbackNode = undefined;
      }
      node = prev;
    }
    this._sources = head;
  }
}

const computed = <T>(compute: () => T) =>
  new Computed(compute) as ExternalComputed<T>;

export { signal, computed, untracked };
