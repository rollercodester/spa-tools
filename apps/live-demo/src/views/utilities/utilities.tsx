import { useState } from 'react';
import { Box, Link, TabList, Tabs, Text, VStack, useMediaQuery } from '@chakra-ui/react';
import { inlineSwitch } from '@spa-tools/utilities';
import { BsClipboardData } from 'react-icons/bs';
import { GoNumber } from 'react-icons/go';
import { IoColorPaletteOutline } from 'react-icons/io5';
import { RiFlowChart } from 'react-icons/ri';
import { TbArrowFork } from 'react-icons/tb';
import { VscWordWrap } from 'react-icons/vsc';
import { PackageMain } from 'showcase/widgets';
import { TabTitle } from 'showcase/widgets/tab-title';
import {
  ColorsTabPanel,
  ConditionalsTabPanel,
  DataTabPanel,
  ExecutionControlTabPanel,
  NumbersTabPanel,
  StringsTabPanel,
} from './tab-panels';

export function UtilitiesView() {
  const [isSmallScreen] = useMediaQuery('(max-width: 882px)');
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <PackageMain
      introContent={
        <VStack sx={{ alignItems: 'flex-start', gap: '1rem' }}>
          <Text>
            There are many great general-purpose Javascript libraries out there, some modern and some not so modern. The{' '}
            <Link color='purple.500' href='https://www.npmjs.com/package/@spa-tools/utilities' target='_blank'>
              <strong>@spa-tools/utilities</strong>
            </Link>{' '}
            package is a modern library to add to the list, succinctly written in TypeScript and heavily{' '}
            <em>utilized</em> by the other @spa-tools packages.
          </Text>
          <Text sx={{ fontWeight: 'normal' }}>
            With this package containing over 5-dozen utitilty functions, we can only demo just a blurb of them here but
            hopefully we pique your interest with a few that can help you in your dev adventures.
          </Text>
        </VStack>
      }
      packageName='Utilities'
    >
      <Tabs
        colorScheme='purple'
        index={tabIndex}
        onChange={handleTabsChange}
        orientation={isSmallScreen ? 'vertical' : 'horizontal'}
        sx={{ width: '100%' }}
      >
        <TabList>
          <TabTitle icon={<TbArrowFork fontSize='1.75rem' />} text='Conditionals' />
          <TabTitle icon={<IoColorPaletteOutline fontSize='2.25rem' />} text='Colors' />
          <TabTitle icon={<BsClipboardData fontSize='1.75rem' />} text='Data' />
          <TabTitle icon={<RiFlowChart fontSize='2rem' />} text='Execution Control' />
          <TabTitle icon={<GoNumber fontSize='2rem' />} text='Numbers' />
          <TabTitle icon={<VscWordWrap fontSize='2.25rem' />} text='Strings' />
        </TabList>
      </Tabs>
      <Box sx={{ pt: '1rem', width: '100%' }}>
        {inlineSwitch<number, JSX.Element>(tabIndex, {
          0: <ConditionalsTabPanel />,
          1: <ColorsTabPanel />,
          2: <DataTabPanel />,
          3: <ExecutionControlTabPanel />,
          4: <NumbersTabPanel />,
          5: <StringsTabPanel />,
        })}
      </Box>
    </PackageMain>
  );
}
