import { useState } from 'react';
import { Box, Link, TabList, Tabs, useMediaQuery } from '@chakra-ui/react';
import { inlineSwitch } from '@spa-tools/utilities';
import { FaReact } from 'react-icons/fa';
import { GiRaceCar } from 'react-icons/gi';
import { MdMemory } from 'react-icons/md';
import { PiTreeStructureDuotone } from 'react-icons/pi';
import { SiCreatereactapp } from 'react-icons/si';
import { TbTransformFilled } from 'react-icons/tb';
import { PackageMain } from 'showcase/widgets';
import { TabTitle } from 'showcase/widgets/tab-title';
import {
  ClientSideCachingTabPanel,
  ClientSideThrottlingTabPanel,
  ReactHookAppendTabPanel,
  ReactHookTabPanel,
  ResultEnvelopeMappingTabPanel,
  StateInterpolationTabPanel,
} from './tab-panels';

export function ApiClientView() {
  const [isSmallScreen] = useMediaQuery('(max-width: 882px)');
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <PackageMain
      introContent={
        <>
          The{' '}
          <Link color='purple.500' href='https://www.npmjs.com/package/@spa-tools/api-client' target='_blank'>
            <strong>@spa-tools/api-client</strong>
          </Link>{' '}
          excels in calling HTTP API endpoints with features that are pervasively required in modern web applications.
          If you need to call backends that don&apos;t utilize web data frameworks like GraphQL, then this tool could be
          just what the doctor ordered.
        </>
      }
      packageName='API Client'
    >
      <Tabs
        colorScheme='purple'
        index={tabIndex}
        onChange={handleTabsChange}
        orientation={isSmallScreen ? 'vertical' : 'horizontal'}
        sx={{ width: '100%' }}
      >
        <TabList>
          <TabTitle icon={<GiRaceCar fontSize='3rem' />} text='Throttling' />
          <TabTitle icon={<MdMemory fontSize='2rem' />} text='Caching' />
          <TabTitle icon={<PiTreeStructureDuotone fontSize='1.75rem' />} text='State Interpolation' />
          <TabTitle icon={<TbTransformFilled fontSize='1.75rem' />} text='Result Mapping' />
          <TabTitle icon={<FaReact fontSize='2rem' />} text='React Hook' />
          <TabTitle icon={<SiCreatereactapp fontSize='2rem' />} text='Appending Data' />
        </TabList>
      </Tabs>
      <Box sx={{ pt: '1rem', width: '100%' }}>
        {inlineSwitch<number, JSX.Element>(tabIndex, {
          0: <ClientSideThrottlingTabPanel />,
          1: <ClientSideCachingTabPanel />,
          2: <StateInterpolationTabPanel />,
          3: <ResultEnvelopeMappingTabPanel />,
          4: <ReactHookTabPanel />,
          5: <ReactHookAppendTabPanel />,
        })}
      </Box>
    </PackageMain>
  );
}
