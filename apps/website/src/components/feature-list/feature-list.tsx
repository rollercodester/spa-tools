import { ReactNode } from 'react';
import { FaCircleCheck } from 'react-icons/fa6';

interface FeatureListProps {
  features: ReactNode[];
}

export function FeatureList({ features }: FeatureListProps) {
  return (
    <ul>
      {features.map((feature, index) => (
        <li key={index} style={{ alignItems: 'center', display: 'flex', gap: '0.35rem', listStyleType: 'none' }}>
          <FaCircleCheck color='var(--ifm-color-primary)' />
          {feature}
        </li>
      ))}
    </ul>
  );
}
