import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { HomepageFeatures, HomepageHeader } from '@site/src/components';
import Layout from '@theme/Layout';
import styles from './pages.module.css';

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div className={styles.layoutContainer}>
      <Layout description={siteConfig.tagline}>
        <div className={styles.homeContainer}>
          <HomepageHeader />
          <main className={styles.mainContainer}>
            <HomepageFeatures />
          </main>
        </div>
      </Layout>
    </div>
  );
}
