import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import { VscDebugStart } from 'react-icons/vsc';
import styles from './styles.module.css';

export function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header>
      <div className={styles.heroContainer}>
        <div className={styles.heroInduction}>
          <Heading as='h1' className={styles.heroTitle}>
            {siteConfig.title}
          </Heading>
          <div className={styles.heroDescription}>{siteConfig.tagline}</div>
          <div className={styles.heroCtaContainer}>
            <Link className={`button button--primary button--lg ${styles.heroCta}`} to='/overview'>
              <div style={{ alignItems: 'flex-start', display: 'flex', gap: '0.5rem' }}>
                <span>Ready to code something SPAwesome?</span>
                <VscDebugStart style={{ fontSize: '1.5rem' }} />
              </div>
            </Link>
          </div>
        </div>
        <div className={styles.heroImageContainer}>
          <img alt='@spa-tools logo' src='./img/logo.svg' style={{ width: '100%' }} />
        </div>
      </div>
    </header>
  );
}
