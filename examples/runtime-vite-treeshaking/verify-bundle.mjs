import fs from 'node:fs';
import path from 'node:path';

const packageKey = process.argv[2];
const outDir = process.argv[3];

if (!packageKey || !outDir) {
  throw new Error('Usage: node verify-bundle.mjs <package-key> <out-dir>');
}

const configs = {
  'reactant-di': {
    expected: ['reactant-di tree-shaking probe', 'typeof forwardRef'],
    unexpected: [
      'reflect-metadata',
      'createCollector',
      'defaultUndefinedValue',
    ],
  },
  'reactant-module': {
    expected: ['reactant-module tree-shaking probe', 'typeof autobind'],
    unexpected: [
      "' ViewModule 'component' property should be defined class 'method'.",
      "You should enable auto computed feature by setting 'autoComputed' to 'true' in the dev options.",
      'combineReducers',
    ],
  },
  'reactant-last-action': {
    expected: [
      'reactant-last-action tree-shaking probe',
      'typeof LastActionOptions',
    ],
    unexpected: [
      "please reset the option 'stateKey' of 'LastAction' module.",
      'beforeCombineRootReducers',
      'ignoreAction',
    ],
  },
  reactant: {
    expected: ['reactant tree-shaking probe', 'typeof injectable'],
    unexpected: [
      "Main module should be a 'ViewModule'.",
      'No render function is configured.',
      "No class with a field decorated by '@state' is injected.",
      'react-redux',
    ],
  },
  'reactant-redux': {
    expected: ['reactant-redux tree-shaking probe', 'typeof redux'],
    unexpected: [
      "' ViewModule 'component' property should be defined class 'method'.",
      "You should enable auto computed feature by setting 'autoComputed' to 'true' in the dev options.",
      'combineReducers',
    ],
  },
  'reactant-model': {
    expected: ['reactant-model tree-shaking probe', 'typeof model'],
    unexpected: [
      "' ViewModule 'component' property should be defined class 'method'.",
      "You should enable auto computed feature by setting 'autoComputed' to 'true' in the dev options.",
      'combineReducers',
    ],
  },
  'reactant-web': {
    expected: ['reactant-web tree-shaking probe', 'typeof BrowserRouter'],
    unexpected: [
      'react-dom/client',
      "'createRoot' requires react-dom@18 or above.",
      'unstable_renderSubtreeIntoContainer',
    ],
  },
  'reactant-storage': {
    expected: [
      'reactant-storage tree-shaking probe',
      'typeof getRehydrated',
    ],
    unexpected: [
      'PersistGate',
      'persistStore',
      'redux-persist: PersistGate expects either a function child or loading prop, but not both.',
    ],
  },
  'reactant-router': {
    expected: [
      'reactant-router tree-shaking probe',
      'typeof createBrowserHistory',
    ],
    unexpected: [
      'ConnectedRouter',
      'CALL_HISTORY_METHOD',
      "The identifier 'router' has a duplicate name",
    ],
  },
  'reactant-router-dom': {
    expected: [
      'reactant-router-dom tree-shaking probe',
      'typeof generatePath',
    ],
    unexpected: ['BrowserRouter', 'NavLink', 'StaticRouter'],
  },
  'reactant-ssr': {
    expected: ['reactant-ssr tree-shaking probe', 'typeof AppView'],
    unexpected: ['createServerApp'],
  },
};

const config = configs[packageKey];

if (!config) {
  throw new Error(`Unknown package key '${packageKey}'.`);
}

const bundlePath = path.resolve(outDir, 'index.js');

if (!fs.existsSync(bundlePath)) {
  throw new Error(`Unable to find bundle output at '${bundlePath}'.`);
}

const bundle = fs.readFileSync(bundlePath, 'utf8');

for (const marker of config.expected) {
  if (!bundle.includes(marker)) {
    throw new Error(
      `Expected bundle to include marker '${marker}', but it was missing.`
    );
  }
}

for (const marker of config.unexpected) {
  if (bundle.includes(marker)) {
    throw new Error(
      `Unexpected tree-shaking marker '${marker}' found in ${bundlePath}.`
    );
  }
}

console.log(`Verified tree shaking for ${packageKey}: ${bundlePath}`);
