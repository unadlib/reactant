import { createApp } from './createApp';
import { Config, App } from './interfaces';

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
