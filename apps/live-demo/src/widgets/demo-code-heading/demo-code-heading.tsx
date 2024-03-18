import { Code } from '@chakra-ui/react';

interface DemoCodeHeadingProps {
  codeText: string;
}

export function DemoCodeHeading({ codeText }: DemoCodeHeadingProps) {
  return <Code sx={{ fontSize: '1.25rem', fontWeight: 800 }}>&nbsp;{codeText}&nbsp;</Code>;
}
