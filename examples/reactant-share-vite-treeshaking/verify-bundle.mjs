import fs from 'node:fs';
import path from 'node:path';

const distAssetsDir = path.resolve('dist/assets');
const bundleFile = fs
  .readdirSync(distAssetsDir)
  .find((file) => file.endsWith('.js'));

if (!bundleFile) {
  throw new Error(`Unable to find bundle output in '${distAssetsDir}'.`);
}

const bundlePath = path.resolve(distAssetsDir, bundleFile);
const bundle = fs.readFileSync(bundlePath, 'utf8');

const expected = [
  'reactant-share tree-shaking probe',
  'typeof useLock',
];

const unexpected = [
  'reactant-share-app-lock:',
  '@@reactant:syncWorkerRouter',
  'PersistGate',
  'ConnectedRouter',
];

for (const marker of expected) {
  if (!bundle.includes(marker)) {
    throw new Error(
      `Expected bundle to include marker '${marker}', but it was missing.`
    );
  }
}

for (const marker of unexpected) {
  if (bundle.includes(marker)) {
    throw new Error(
      `Unexpected tree-shaking marker '${marker}' found in ${bundlePath}.`
    );
  }
}

console.log(`Verified tree shaking for ${bundlePath}.`);
