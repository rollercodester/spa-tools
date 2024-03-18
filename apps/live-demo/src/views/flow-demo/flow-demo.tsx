import { Box, HStack, Heading, VStack, useMediaQuery } from '@chakra-ui/react';
import { DemoBanner, DemoProps } from 'showcase/widgets';

export function FlowDemoView(demoProps?: DemoProps) {
  const [isSmallScreen] = useMediaQuery('(max-width: 1250px)');

  return (
    <Box
      sx={{
        background:
          'url(/spatools-home-bg.png) no-repeat right center, linear-gradient(to top left, #ffffff, #fbf3ff, #dda7f2)',
        backgroundPosition: 'right',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        height: '100%',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <HStack
        sx={{
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: isSmallScreen ? '2rem' : 0,
          justifyContent: isSmallScreen ? 'center' : 'flex-start',
          overflow: 'hidden',
          p: '2rem',
          position: 'relative',
          pt: '4rem',
          textAlign: 'left',
          width: '100%',
        }}
      >
        <VStack
          sx={{
            alignItems: isSmallScreen ? 'center' : 'flex-start',
            flexBasis: '50rem',
            flexGrow: 1,
            gap: '1rem',
            maxWidth: '42rem',
            width: '100%',
          }}
        >
          <Heading
            as='h1'
            size='3xl'
            sx={{
              color: '#000000',
              fontStyle: 'italic',
              fontWeight: 500,
              lineHeight: '110%',
              textAlign: isSmallScreen ? 'center' : 'left',
            }}
          >
            Mock Demo View
          </Heading>
          <Heading
            as='h2'
            size='lg'
            sx={{
              color: 'gray.800',
              fontWeight: 500,
              lineHeight: '130%',
              mb: '0.5rem',
              textAlign: isSmallScreen ? 'center' : 'left',
            }}
          >
            For demonstration purposes only!
          </Heading>
        </VStack>
      </HStack>
      {!!demoProps && <DemoBanner {...demoProps} />}
    </Box>
  );
}
