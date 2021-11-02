import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';
import Head from "@docusaurus/Head";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <h1 style={{ color: "white" }} className="hero__title title">{siteConfig.title}</h1>
        <p style={{ color: "white" }} className="hero__subtitle title">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/intro">
            Get Started
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/installation">
            Installation
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/static/img/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/img/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/img/favicon-16x16.png" />
        <link rel="manifest" href="/static/img/site.webmanifest" />
        <link rel="mask-icon" href="/static/img/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Layout
        title={`Forms? Nah, they aren't hard anymore!😊`}
        description={siteConfig.tagline}
        image="img/logos/react-binden-logo-circular.png"
      >
        <HomepageHeader />
        <main>
          <HomepageFeatures />
        </main>
      </Layout>
    </>
  );
}
