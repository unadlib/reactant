// eslint-disable-next-line import/no-extraneous-dependencies
import { jsdocTests } from 'jsdoc-tests';

test('base "createApp" function', async () => {
  await jsdocTests('../src/createApp.ts', __dirname);
});
