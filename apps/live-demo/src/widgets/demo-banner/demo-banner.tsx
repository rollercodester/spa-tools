import { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react';
import { useCoreRouter } from '@spa-tools/core-router';

const COUNTDOWN_SECONDS = 4;

export interface DemoProps {
  fromDemoPath?: string;
  fromDemoState?: {
    activeDemo?: string;
    activeTab: number;
  };
}

export function DemoBanner({ fromDemoPath, fromDemoState }: DemoProps) {
  const [count, setCount] = useState(COUNTDOWN_SECONDS);
  const { navigate } = useCoreRouter();

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCount((prevCount) => prevCount - 1);

      if (count === 1) {
        clearInterval(intervalId);
        navigate(String(fromDemoPath), fromDemoState);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [count, fromDemoPath, fromDemoState, navigate]);

  return (
    <Alert
      id='demo'
      status='info'
      sx={{
        alignItems: 'center',
        bottom: 0,
        flexDirection: 'column',
        height: '200px',
        justifyContent: 'center',
        textAlign: 'center',
      }}
      variant='subtle'
    >
      <AlertIcon sx={{ boxSize: '2.5rem', mr: 0 }} />
      <AlertTitle sx={{ fontSize: 'xl', mb: 1, mt: 4 }}>DEMO Navigation Detected!</AlertTitle>
      <AlertDescription sx={{ fontSize: 'lg', fontWeight: 600, maxW: 'lg' }}>
        You will be automatically navigated back in <span style={{ fontSize: '1.5rem', fontWeight: 900 }}>{count}</span>{' '}
        seconds...
      </AlertDescription>
    </Alert>
  );
}
