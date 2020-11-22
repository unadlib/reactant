// eslint-disable-next-line import/no-extraneous-dependencies
import { jsdocTests } from 'jsdoc-tests';

test('base "createApp" function', () => {
  jsdocTests('../src/createApp.tsx', __dirname, require);
});
