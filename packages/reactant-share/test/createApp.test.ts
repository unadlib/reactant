// eslint-disable-next-line import/no-extraneous-dependencies
import { jsdocTests } from 'jsdoc-tests';

test('base "createApp" function', (done) => {
  global.done = done;
  jsdocTests('../src/createApp.ts', __dirname, require);
});
