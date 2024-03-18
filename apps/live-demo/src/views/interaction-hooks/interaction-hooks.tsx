import { useState } from 'react';
import { Box, Link, TabList, Tabs, Text, VStack, useMediaQuery } from '@chakra-ui/react';
import { inlineSwitch } from '@spa-tools/utilities';
import { GiSeatedMouse } from 'react-icons/gi';
import { LiaKeyboard } from 'react-icons/lia';
import { LuScrollText } from 'react-icons/lu';
import { TbFilterSearch } from 'react-icons/tb';
import { PackageMain } from 'showcase/widgets';
import { TabTitle } from 'showcase/widgets/tab-title';
import {
  UseDetectKeydownTabPanel,
  UseInfiniteScrollTabPanel,
  UseIsHoveredTabPanel,
  UseQueryStateTabPanel,
} from './tab-panels';

export function InteractionHooksView() {
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
            <Link color='purple.500' href='https://www.npmjs.com/package/@spa-tools/interaction-hooks' target='_blank'>
              <strong>@spa-tools/interaction-hooks</strong>
            </Link>{' '}
            is a small package of specialized React hooks meant to solve common interaction scenarios in modern web
            applications.
          </Text>
          <Text sx={{ fontWeight: 'normal' }}>Below is a sampling of the hooks that can be found in the package.</Text>
        </VStack>
      }
      packageName='Interaction Hooks'
    >
      <Tabs
        colorScheme='purple'
        index={tabIndex}
        isLazy
        onChange={handleTabsChange}
        orientation={isSmallScreen ? 'vertical' : 'horizontal'}
        sx={{ width: '100%' }}
      >
        <TabList>
          <TabTitle code icon={<TbFilterSearch fontSize='1.75rem' />} text='useQueryState' />
          <TabTitle code icon={<LuScrollText fontSize='1.75rem' />} text='useInfiniteScroll' />
          <TabTitle code icon={<LiaKeyboard fontSize='2.25rem' />} text='useDetectKeydown' />
          <TabTitle code icon={<GiSeatedMouse fontSize='2.25rem' />} text='useIsHovered' />
        </TabList>
      </Tabs>
      <Box sx={{ pt: '1rem', width: '100%' }}>
        {inlineSwitch<number, JSX.Element>(tabIndex, {
          0: <UseQueryStateTabPanel />,
          1: <UseInfiniteScrollTabPanel />,
          2: <UseDetectKeydownTabPanel />,
          3: <UseIsHoveredTabPanel />,
        })}
      </Box>
    </PackageMain>
  );
}
