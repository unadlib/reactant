import { getRehydrated } from 'reactant-storage';

console.log('reactant-storage tree-shaking probe', getRehydrated);
console.log(`typeof getRehydrated: ${typeof getRehydrated}`);
