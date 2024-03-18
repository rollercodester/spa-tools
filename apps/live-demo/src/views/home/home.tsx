import { Box, HStack, Heading, Image, VStack, useMediaQuery } from '@chakra-ui/react';
import { DemoBanner, DemoProps } from 'showcase/widgets';

export function HomeView(demoProps?: DemoProps) {
  const [isSmallScreen] = useMediaQuery('(max-width: 1250px)');

  return (
    <Box
      sx={{
        background: 'url(/spatools-home-bg.png), linear-gradient(to top, #ffffff, #fbf3ff, #dda7f2)',
        backgroundPosition: 'bottom, bottom right',
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundSize: '100% 20%, cover',
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
        {!isSmallScreen && (
          <Box
            sx={{
              flexGrow: 1,
              justifySelf: 'center',
              maxH: '100vh',
              maxW: '30rem',
              minW: '20rem',
              textAlign: 'center',
            }}
          >
            <Image alt='Logo' src='/graphic.svg' sx={{ opacity: '0.75', width: '100%' }} />
          </Box>
        )}
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
            Elevate your SPA development experience
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
            Open-source tools for single-page applications
          </Heading>
        </VStack>
        {isSmallScreen && (
          <Box
            sx={{
              flexGrow: 1,
              justifySelf: 'center',
              maxWidth: '28rem',
              textAlign: 'center',
            }}
          >
            <Image alt='Logo' src='/graphic.svg' sx={{ width: '100%' }} />
          </Box>
        )}
      </HStack>
      {!!demoProps && !!demoProps.fromDemoPath && <DemoBanner {...demoProps} />}
    </Box>
  );
}
