import { ReactNode } from 'react';
import { Box, VStack } from '@chakra-ui/react';
import { PackageHeading } from 'showcase/widgets';

interface PackageMainProps {
  children: JSX.Element[];
  introContent: ReactNode;
  packageName: string;
}

export function PackageMain({ children, introContent, packageName }: PackageMainProps) {
  return (
    <VStack sx={{ alignItems: 'flex-start', gap: '1rem' }}>
      <PackageHeading packageName={packageName} />
      <Box>{introContent}</Box>
      {children}
    </VStack>
  );
}
