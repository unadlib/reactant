import { forwardRef } from 'reactant-di';

console.log('reactant-di tree-shaking probe', forwardRef);
console.log(`typeof forwardRef: ${typeof forwardRef}`);
