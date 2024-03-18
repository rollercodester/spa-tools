import { Code, Text, VStack } from '@chakra-ui/react';
import { RiRunFill } from 'react-icons/ri';
import { DemoViewport, logLabel } from 'showcase/widgets';
import { myAppRuntimeConfig } from '../myapp-runtime-config';

export function RuntimeDetectionTabPanel() {
  return (
    <DemoViewport
      code={code}
      ctaContent='Run Runtime Detection Demo'
      ctaIcon={<RiRunFill fontSize='2rem' />}
      headingContent={
        <VStack sx={{ alignItems: 'flex-start', gap: '1rem' }}>
          <Text>
            As you may have already deduced, the Runtime Config&apos;s detection algo is driven by the browser&apos;s
            active URL&mdash;more specifically the <Code>window.location.hostname</Code> value. No magic. No tricks.
            Just simple logic.
          </Text>
          <Text sx={{ fontWeight: 'normal' }}>
            Is it possible to use Runtime Config outside of a browser? Yes, but you have to manually provide the active
            hostname (see the &quot;Minimalist Options&quot; tab for more details).
          </Text>
          <Text sx={{ fontWeight: 'normal' }}>
            Now that we&apos;ve divulged the secret sauce, let&apos;s see how the Runtime Config can be used in app
            code.
          </Text>
        </VStack>
      }
      initialOutputMessage='Click the "Run Runtime Detection Demo" button to execute the demo...'
      language='ts'
      onClickCtaButton={() => {
        console.log();
        logLabel('What is the current environment context?');
        console.log(myAppRuntimeConfig.settings.environment);
        logLabel("What is MyApp's current API URL?");
        console.log(myAppRuntimeConfig.settings.myAppApiUrl);
        logLabel("Let's use the isRunningLocal property to check if we are running locally...");
        if (myAppRuntimeConfig.isRunningLocal) {
          console.log('We are indeed running locally!');
        } else {
          console.log('We are NOT running locally!');
        }
        logLabel("Let's just log all settings for good measure...");
        console.log(myAppRuntimeConfig.settings);
        console.log();
      }}
    />
  );
}

//
//
// DISPLAY CODE
//
//

const code = `import { myAppRuntimeConfig } from './myapp-runtime-config';

console.log('What is the current environment context?');
console.log(myAppRuntimeConfig.settings.environment);

console.log("What is MyApp's current API URL?");
console.log(myAppRuntimeConfig.settings.myAppApiUrl);

console.log("Let's use the isRunningLocal property to check if we are running locally...");
if (myAppRuntimeConfig.isRunningLocal) {
  console.log('We are indeed running locally!');
} else {
  console.log('We are NOT running locally!');
}

console.log("Let's just log all settings for good measure...");
console.log(myAppRuntimeConfig.settings);
`;
