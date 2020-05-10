import { createApp, Config, ReturnValue } from './createApp';

function testBed<T>(config: Config<T>): ReturnValue<T> {
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
