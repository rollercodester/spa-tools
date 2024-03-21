interface PackageCaptionProps {
  packageName: string;
}

export function PackageCaption({ packageName }: PackageCaptionProps) {
  return (
    <code
      style={{
        backgroundColor: 'var(--ifm-background-color)',
        border: 'none',
        color: 'var(--ifm-color-primary-darkest)',
        fontSize: '1.25rem',
        padding: '0.12rem 0.25rem',
      }}
    >
      {packageName}
    </code>
  );
}
