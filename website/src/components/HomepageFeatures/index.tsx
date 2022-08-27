/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy',
    Svg: require('@site/static/img/undraw_researching.svg').default,
    description: (
      <>
        Lightweight framework, a quick read of the guide makes it easy to get
        started.
      </>
    ),
  },
  {
    title: 'High Efficiency',
    Svg: require('@site/static/img/undraw_operating_system.svg').default,
    description: (
      <>
        Simple APIs and efficient CLI make developing applications so efficient.
      </>
    ),
  },
  {
    title: 'Flexible',
    Svg: require('@site/static/img/undraw_react.svg').default,
    description: (
      <>
        All of React ecosystems can be plugged in and modularized to work
        together.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
