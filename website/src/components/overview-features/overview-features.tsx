interface OverviewFeaturesProps {
  features: {
    icon: React.ReactElement;
    title: React.ReactNode;
    titleStyle?: React.CSSProperties;
  }[];
}

export function OverviewFeatures({ features }: OverviewFeaturesProps) {
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2.5rem',
      }}
    >
      {features.map((feature, idx) => (
        <div key={idx} style={{ alignItems: 'baseline', display: 'flex', flexDirection: 'row', gap: '0.35rem' }}>
          <div style={{ color: '#aa7bc7', position: 'relative', top: '0.5rem' }}>{feature.icon}</div>
          <strong style={feature.titleStyle}>{feature.title}</strong>
        </div>
      ))}
    </div>
  );
}
