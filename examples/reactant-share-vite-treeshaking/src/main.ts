import { useLock } from 'reactant-share';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error("Missing '#app' element.");
}

app.textContent = `typeof useLock: ${typeof useLock}`;

console.log('reactant-share tree-shaking probe', useLock);
