/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

type FeatureItem = {
  title: string;
  image: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Super Simple',
    image: '/img/undraw_super-simple.svg',
    description: (
      <>
        React Binden offers the simplest, flexible and customizable experience for Form handling & validation
      </>
    ),
  },
  {
    title: 'Lightweight & Tree-shakable',
    image: '/img/undraw_lightweight.svg',
    description: (
      <>
        It&apos;s one of the lightest form library for React. As it uses ESNext modules, React Binden is completely tree-shakable leading to a much smaller bundle size
      </>
    ),
  },
  {
    title: 'Validation out of the box',
    image: '/img/undraw_out-of-the-box.svg',
    description: (
      <>
        Instead of relying on a third-party validation library, React Binden validates form by itself. Which reduces bundle size & makes validation a lot more flexible
      </>
    ),
  },
];

function Feature({ title, image, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img className={styles.featureSvg} alt={title} src={image} />
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
