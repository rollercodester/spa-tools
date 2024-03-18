import { useState } from 'react';
import { Box, Code, Link, TabList, Tabs, Text, VStack, useMediaQuery } from '@chakra-ui/react';
import { inlineSwitch } from '@spa-tools/utilities';
import { GiStaticWaves } from 'react-icons/gi';
import { GrDocumentConfig } from 'react-icons/gr';
import { IoMdOptions } from 'react-icons/io';
import { RiRunFill } from 'react-icons/ri';
import { PackageMain } from 'showcase/widgets';
import { TabTitle } from 'showcase/widgets/tab-title';
import { ConfigDefinitionTabPanel, ObfuscationTabPanel, OptionsTabPanel, RuntimeDetectionTabPanel } from './tab-panels';

export function RuntimeConfigView() {
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
            <Link color='purple.500' href='https://www.npmjs.com/package/@spa-tools/runtime-config' target='_blank'>
              <strong>@spa-tools/runtime-config</strong>
            </Link>{' '}
            is a hands-off alternative to the typical approach of using multiple <Code>.env</Code> files. It&apos;s true
            that the static dotenv flow has been standardized for quite some time now, but it typically involves
            maintaining build scripts in lockstep with devops pipelines to ensure that pseudo environment-variables are
            available to your app across respective environments.
          </Text>
          <Text sx={{ fontWeight: 'normal' }}>
            Conversely, with the Runtime Config you don&apos;t have to worry about devops scripts because the correct
            environment config is automatically available at <em>runtime</em>, which is how the coy name
            &quot;runtime-config&quot; came about.
          </Text>
        </VStack>
      }
      packageName='Runtime Config'
    >
      <Tabs
        colorScheme='purple'
        index={tabIndex}
        onChange={handleTabsChange}
        orientation={isSmallScreen ? 'vertical' : 'horizontal'}
        sx={{ width: '100%' }}
      >
        <TabList>
          <TabTitle icon={<GrDocumentConfig fontSize='1.75rem' />} text='Config Definition' />
          <TabTitle icon={<RiRunFill fontSize='2rem' />} text='Runtime Detection' />
          <TabTitle icon={<IoMdOptions fontSize='1.75rem' />} text='Minimalist Options' />
          <TabTitle icon={<GiStaticWaves fontSize='1.75rem' />} text='Obfuscation' />
        </TabList>
      </Tabs>
      <Box sx={{ pt: '1rem', width: '100%' }}>
        {inlineSwitch<number, JSX.Element>(tabIndex, {
          0: <ConfigDefinitionTabPanel />,
          1: <RuntimeDetectionTabPanel />,
          2: <OptionsTabPanel />,
          3: <ObfuscationTabPanel />,
        })}
      </Box>
    </PackageMain>
  );
}
