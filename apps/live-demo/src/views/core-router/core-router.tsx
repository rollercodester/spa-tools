import { useState } from 'react';
import { Box, Link, TabList, Tabs, Text, VStack, useMediaQuery } from '@chakra-ui/react';
import { inlineSwitch } from '@spa-tools/utilities';
import { BsController } from 'react-icons/bs';
import { IoMdOptions } from 'react-icons/io';
import { PiNavigationArrowDuotone } from 'react-icons/pi';
import { TbRouteSquare } from 'react-icons/tb';
import { TbBrandReact } from 'react-icons/tb';
import { PackageMain } from 'showcase/widgets';
import { TabTitle } from 'showcase/widgets/tab-title';
import {
  FlowControlTabPanel,
  NavigationTabPanel,
  OptionsTabPanel,
  RouteFactoryTabPanel,
  RoutingReactTabPanel,
} from './tab-panels';

interface CoreRouterViewProps {
  activeDemo?: string;
  activeTab?: number;
}

export function CoreRouterView({ activeDemo, activeTab = 0 }: CoreRouterViewProps) {
  const [isSmallScreen] = useMediaQuery('(max-width: 882px)');
  const [tabIndex, setTabIndex] = useState(activeTab);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <PackageMain
      introContent={
        <VStack sx={{ alignItems: 'flex-start', gap: '1rem' }}>
          <Text>
            The{' '}
            <Link color='purple.500' href='https://www.npmjs.com/package/@spa-tools/core-router' target='_blank'>
              <strong>@spa-tools/core-router</strong>
            </Link>{' '}
            is a lightweight yet powerful router that focuses on <em>core</em> SPA routing needs without bringing any
            excess baggage along.
          </Text>
          <Text sx={{ fontWeight: 'normal' }}>
            Note that the Core Router is designed for auth-based, real-world SPAs that{' '}
            <em>neither require nor desire</em> SEO optimization.
          </Text>
          <Text sx={{ fontWeight: 'normal' }}>
            If your site is 100% public and depends heavily on SEO optimization, then you&apos;re probably already using
            a solution that takes care of routing for you (like Next.js).
          </Text>
        </VStack>
      }
      packageName='Core Router'
    >
      <Tabs
        colorScheme='purple'
        index={tabIndex}
        onChange={handleTabsChange}
        orientation={isSmallScreen ? 'vertical' : 'horizontal'}
        sx={{ width: '100%' }}
      >
        <TabList>
          <TabTitle icon={<TbRouteSquare fontSize='1.75rem' />} text='Route Factory' />
          <TabTitle icon={<IoMdOptions fontSize='1.75rem' />} text='Options' />
          <TabTitle icon={<PiNavigationArrowDuotone fontSize='1.75rem' />} text='Navigation' />
          <TabTitle icon={<BsController fontSize='1.75rem' />} text='Flow Control' />
          <TabTitle icon={<TbBrandReact fontSize='1.75rem' />} text='Routing in React' />
        </TabList>
      </Tabs>
      <Box sx={{ pt: '1rem', width: '100%' }}>
        {inlineSwitch<number, JSX.Element>(tabIndex, {
          0: <RouteFactoryTabPanel />,
          1: <OptionsTabPanel />,
          2: <NavigationTabPanel />,
          3: <FlowControlTabPanel activeDemo={activeDemo} />,
          4: <RoutingReactTabPanel activeDemo={activeDemo} />,
        })}
      </Box>
    </PackageMain>
  );
}
