import { useState } from 'react';
import { HStack, Radio, RadioGroup, Text, VStack } from '@chakra-ui/react';
import { useCoreRouter } from '@spa-tools/core-router';
import { TbBrandReact } from 'react-icons/tb';
import { routes } from 'showcase/router';
import { DemoViewport } from 'showcase/widgets';
import { FlowControlDemo } from './flow-control';

interface RoutingReactTabPanelProps {
  activeDemo?: string;
}

type ReactDemoCode = 'router' | 'cta' | 'banner';

export function RoutingReactTabPanel({ activeDemo }: RoutingReactTabPanelProps) {
  const normActiveDemo = (activeDemo || 'Deny Flow') as FlowControlDemo;
  const activeDemoCode =
    normActiveDemo === 'Deny Flow' ? 'router' : normActiveDemo === 'Confirm Flow' ? 'cta' : 'banner';
  const [code, setCode] = useState<ReactDemoCode>(activeDemoCode);
  const { navigate } = useCoreRouter();

  const RadioOptions = () => (
    <RadioGroup
      colorScheme='purple'
      onChange={(value) => {
        const newDemo = value as ReactDemoCode;
        setCode(newDemo);
      }}
      value={code}
    >
      <HStack sx={{ gap: '0.75rem' }}>
        <Radio value='router'>main.tsx</Radio>
        <Radio value='cta'>demo-cta.tsx</Radio>
        <Radio value='banner'>demo-banner.tsx</Radio>
      </HStack>
    </RadioGroup>
  );

  return (
    <DemoViewport
      code={REACT_DEMO_CODE[code]}
      codeOnly
      ctaContent='Run the Core React Router Demo'
      ctaIcon={<TbBrandReact fontSize='1.75rem' />}
      headingContent={
        <VStack sx={{ alignItems: 'flex-start', gap: '1rem' }}>
          <Text>
            Creating an abstraction on top of the Core Router for your rendering library of choice is super
            straightforward. In fact, the Core Router already ships with a react-flavored version, aptly named{' '}
            <em>Core React Router</em>.
          </Text>
          <Text sx={{ fontWeight: 'normal', lineHeight: 1.5 }}>
            Here&apos;s a look at what the <em> Flow Control - Confirm Route Request</em> demo looks like using the Core
            React Router.
          </Text>
        </VStack>
      }
      inputWidget={<RadioOptions />}
      language='tsx'
      onClickCtaButton={() => {
        navigate(
          routes.flowDemoRoute,
          { fromDemoPath: routes.routerRoute.path, fromDemoState: { activeDemo: 'Confirm Flow', activeTab: 4 } },
          '#demo'
        );
      }}
    />
  );
}

//
//
// DISPLAY CODE
//
//

const ROUTER_CODE = `/********************************************
  Core React Router Demo - Main/Router Code
********************************************/
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { CoreReactRouter } from '@spa-tools/core-router';
import { routes } from './routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CoreReactRouter
      fallbackRoute={routes.homeRoute}
      onRouteRequest={({ newRoute }) => {
        if (newRoute === routes.flowDemoRoute) {
          //
          // request is for the Flow Demo Route, so prompt the user to confirm
          //
          const confirmed = confirm('Are you sure you want to navigate to the Flow Demo view?');
          return Promise.resolve(confirmed);
        }

        // auto-approve all other route requests
        return Promise.resolve(true);
      }}
      routes={routes}
    />
  </StrictMode>
);
`;

const CTA_CODE = `/********************************************
   Core React Router Demo - CTA Code
********************************************/
import { useCoreRouter } from '@spa-tools/core-router';
import { CtaButton } from './cta-button';
import { routes } from './routes';

export function DemoCtaButon() {
  const { navigate } = useCoreRouter();

  return (
    <CtaButton
      icon='react'
      onClick={() => {
        //
        // here we utilize the Core Router's
        // useCoreRouter hook to navigate
        //
        navigate(
          // request to nav to the flow demo route
          routes.flowDemoRoute,
          // state where we let the flow demo view
          // know how to navigate back
          {
            fromDemoPath: routes.routerRoute.path,
            fromDemoState: { activeDemo: 'Confirm Flow', activeTab: 4 }
          },
          // include hash to scroll to demo banner
          // after navigation
          '#demo'
        );
      }}
    >
      Run the React Demo
    </CtaButton>
  );
}
`;

const BANNER_CODE = `/********************************************
   Core React Router Demo - Banner Code
********************************************/
import { useEffect, useState } from 'react';
import { useCoreRouter } from '@spa-tools/core-router';
import { Banner, BannerDescription, BannerIcon, BannerTitle } from './banner';

export function DemoBanner({ fromDemoPath, fromDemoState }: DemoBannerProps) {
  const [count, setCount] = useState(4);
  const { navigate } = useCoreRouter();

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCount((prevCount) => prevCount - 1);

      if (count === 1) {
        clearInterval(intervalId);
        //
        // here we utilize the Core Router's
        // useCoreRouter hook to navigate
        //
        navigate(fromDemoPath, fromDemoState);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [count, fromDemoPath, fromDemoState, navigate]);

  return (
    // Note the "demo" ID, which is used to
    // scroll to the banner after navigation
    <Banner id='demo'>
      <BannerIcon />
      <BannerTitle>DEMO Navigation Detected!</BannerTitle>
      <BannerDescription>
        You will be automatically navigated back in <span>{count}</span> seconds...
      </BannerDescription>
    </Banner>
  );
}

interface DemoBannerProps {
  fromDemoPath: string;
  fromDemoState: {
    activeDemo: string;
    activeTab: number;
  };
}
`;

const REACT_DEMO_CODE: Record<ReactDemoCode, string> = {
  banner: BANNER_CODE,
  cta: CTA_CODE,
  router: ROUTER_CODE,
};
