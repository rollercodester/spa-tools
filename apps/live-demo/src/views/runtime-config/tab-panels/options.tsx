import { Box, Code, Text, VStack } from '@chakra-ui/react';
import { RuntimeConfig } from '@spa-tools/runtime-config';
import { IoMdOptions } from 'react-icons/io';
import { DemoViewport, FeatureList, logLabel } from 'showcase/widgets';
import { MyAppConfigSettings, MyAppEnvironments, myAppConfigSet } from '../myapp-runtime-config';

export function OptionsTabPanel() {
  return (
    <DemoViewport
      code={code}
      ctaContent='Run Options Demo'
      ctaIcon={<IoMdOptions fontSize='1.75rem' />}
      headingContent={
        <VStack sx={{ alignItems: 'flex-start', gap: '1rem' }}>
          <Text>The Runtime Config is so straightforward that there are only two options to discuss:</Text>
          <Box sx={{ fontWeight: 'normal', gap: '2rem', ml: '1rem' }}>
            <FeatureList features={['Localhost IP Address', 'Manual Active Hostname']} />
          </Box>
          <Text sx={{ fontWeight: 'normal' }}>
            The <Code>localhostIpAddress</Code> option allows you to set the IP Address that your machine uses for your
            local IP address, should it be different than the default value of <Code>127.0.0.1</Code>. As you probably
            guessed, this is used as a fallback in case your machine does not have a hosts entry for{' '}
            <Code>localhost</Code> or does not resolve for some reason.
          </Text>
          <Text sx={{ fontWeight: 'normal' }}>
            The <Code>manualActiveHostname</Code> option allows you to manually set the active hostname for the current
            runtime environment. This setting is only necessary if your app runs in non-browser environments where the
            hostname cannot be automatically detected. Obviously, to use this across mutliple environments will require
            some devops work, so this option makes the most practical sense if you need to use the config in parallel
            across both browser and non-browser environments.
          </Text>
        </VStack>
      }
      initialOutputMessage='Click the "Run Options Demo" button to execute the demo...'
      language='ts'
      onClickCtaButton={() => {
        const myAppRuntimeConfig = RuntimeConfig.initialize<MyAppConfigSettings, MyAppEnvironments>(myAppConfigSet, {
          localhostIpAddress: '127.0.1.1',
          manualActiveHostname: 'myapp.com',
        });

        logLabel('\nThe runtime config object we just created with options:');
        console.log(myAppRuntimeConfig);
      }}
    />
  );
}

//
//
// DISPLAY CODE
//
//

const code = `import { myAppConfigSet } from './myapp-domain-config';

// here we initialize the runtime config object with options
export const myAppRuntimeConfig = RuntimeConfig.initialize(
  myAppConfigSet,
  {
    localhostIpAddress: '127.0.1.1',
    manualActiveHostname: 'myapp.com',
  }
);

console.log('The runtime config object we just initialized:');
console.log(myAppRuntimeConfig);
`;
