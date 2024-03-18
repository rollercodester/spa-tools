/* eslint-disable @typescript-eslint/no-var-requires */
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  description: JSX.Element;
  src: string;
  title: string;
};

const FeatureList: FeatureItem[] = [
  {
    description: <>Minimalist by design&mdash;separating concerns without sacrificing core features.</>,
    src: '/img/anti-kitchen-sink.png',
    title: 'Anti-Kitchen-Sink',
  },
  {
    description: <>Written 100% in TypeScript with first-class type support baked right-on in.</>,
    src: '/img/typescript-logo.png',
    title: 'TypeScript-First',
  },
  {
    description: <>Lean and mean without worrying about package bloat or dependency nightmares.</>,
    src: '/img/zero-deps.png',
    title: 'Zero Dependencies',
  },
  {
    description: <>Only bundle features you import and never again ship dead library code.</>,
    src: '/img/tree-shake.png',
    title: 'Tree-Shakable',
  },
];

function Feature({ description, src, title }: FeatureItem) {
  return (
    <div className={styles.featureContainer}>
      <div className='text--center'>
        <img alt={title} className={styles.featureImg} src={src} />
      </div>
      <div className='text--center padding-horiz--md'>
        <Heading as='h3'>{title}</Heading>
        <p style={{ fontWeight: 500 }}>{description}</p>
      </div>
    </div>
  );
}

export function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      {FeatureList.map((props, idx) => (
        <Feature key={idx} {...props} />
      ))}
    </section>
  );
}
