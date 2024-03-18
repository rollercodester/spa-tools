import { ReactNode } from 'react';

interface SectionTextProps {
  bottomMargin?: string;
  children: ReactNode;
  topMargin?: string;
}

export function SectionText({ bottomMargin = '2rem', children, topMargin = '1rem' }: SectionTextProps) {
  return (
    <div style={{ fontSize: '1.1rem', fontWeight: 600, padding: `${topMargin} 0 ${bottomMargin} 0` }}>{children}</div>
  );
}
