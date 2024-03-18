import { HStack, Heading, Text } from '@chakra-ui/react';

interface PackageHeadingProps {
  packageName: string;
}

export function PackageHeading({ packageName }: PackageHeadingProps) {
  return (
    <HStack sx={{ alignItems: 'center', gap: '0.75rem' }}>
      <Heading size='lg' sx={{ fontSize: '1.75rem' }}>
        {packageName}
      </Heading>
      <Text sx={{ fontSize: '1.25rem' }}>Examples</Text>
    </HStack>
  );
}
