import React from 'react';
import { injectable, ViewModule, createContainer, defaultProps } from '../..';

test('base module with @state and @action', () => {
  interface CounterProps {
    version?: string;
  }

  @injectable()
  class Counter extends ViewModule {
    @defaultProps({
      version: '0.0.1',
    })
    component(props: CounterProps) {
      return <></>;
    }
  }
  const ServiceIdentifiers = new Map();
  const modules = [Counter];
  const container = createContainer({
    ServiceIdentifiers,
    modules,
    options: {
      defaultScope: 'Singleton',
    },
  });
  const counter = container.get(Counter);
  expect((counter.component as any).defaultProps).toEqual({
    version: '0.0.1',
  });
});
