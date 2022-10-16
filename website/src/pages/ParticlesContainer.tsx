import React from 'react';
import Particles from 'react-particles';
import type { Engine } from 'tsparticles-engine';
import { loadLinksPreset } from 'tsparticles-preset-links';

export default class ParticlesContainer extends React.PureComponent {
  // this customizes the component tsParticles installation
  async customInit(engine: Engine): Promise<void> {
    // this adds the preset to tsParticles, you can safely use the
    await loadLinksPreset(engine);
  }

  render() {
    return (
      <Particles
        options={{
          preset: 'links',
          background: {
            color: {
              value: '#3fa9f5',
            },
          },
          fullScreen: {
            enable: false,
          },
          detectRetina: true,
          particles: {
            size: {
              value: { min: 1, max: 2.5 },
            },
          },
        }}
        height="310px"
        init={this.customInit}
      />
    );
  }
}
