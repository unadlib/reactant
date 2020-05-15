import { createApp } from './createApp';
import { App, Config } from './interfaces';

function testBed<T>(config: Config<T>): App<T> {
  return createApp<T>({
    ...config,
    render:
      config.render ||
      (() => {
        console.log(`No render function is configured.`);
      }),
  });
}

export { testBed };
