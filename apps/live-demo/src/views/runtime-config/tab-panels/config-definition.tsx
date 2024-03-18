import { Text, VStack } from '@chakra-ui/react';
import { Code } from '@chakra-ui/react';
import { GrDocumentConfig } from 'react-icons/gr';
import { DemoViewport, logLabel } from 'showcase/widgets';
import { myAppRuntimeConfig } from '../myapp-runtime-config';

export function ConfigDefinitionTabPanel() {
  return (
    <DemoViewport
      code={code}
      ctaContent='Run Config Definition Demo'
      ctaIcon={<GrDocumentConfig fontSize='1.75rem' />}
      headingContent={
        <VStack sx={{ alignItems: 'flex-start', gap: '1rem' }}>
          <Text>
            No two environment config-sets are the same, and the Runtime Config is designed to handle this reality.
          </Text>
          <Text sx={{ fontWeight: 'normal' }}>
            The only requirement is that your environment domain-config is a serializable JavaScript object (
            <Code>Record&lt;string, T&gt;</Code> in Typescript speak). Otherwise, you can define your environment
            domain-config however you like. And what&apos;s more, this allows you to write all of your environment
            configuration in one place, which makes ongoing maintenance a breeze.
          </Text>
          <Text sx={{ fontWeight: 'normal' }}>
            Enough gibber-gobbish...let&apos;s see how easy it is to define a domain-config.
          </Text>
        </VStack>
      }
      initialOutputMessage='Click the "Run Config Definition Demo" button to execute the demo...'
      language='ts'
      onClickCtaButton={() => {
        logLabel('\nThe runtime config object we just created:');
        console.log(myAppRuntimeConfig);
        logLabel('Check out the "Runtime Detection" tab to see how we can use our shiny new runtime config...');
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

const code = `import { BaseConfigSettings, DomainConfig, RuntimeConfig } from '@spa-tools/runtime-config';

// since we're using Typescript, we define a type for our environment names
type MyAppEnvironments = 'development' | 'staging' | 'production';

// likewise, we define a type for our app's runtime config settings
interface MyAppConfigSettings extends BaseConfigSettings<MyAppEnvironments> {
  authClientId: string;
  authUserPoolId: string;
  loggerClientId: string;
  loggerUrl: string;
  myAppApiUrl: string;
}

//
// and this is where we define our environment domain-config by mapping
// our app domain names to our respective environment settings
//
// you may notice that there is one additional property in the domain-config
// named "environment" and this is required, which is why MyAppConfigSettings
// extends BaseConfigSettings. If you don't use Typescript, you just need
// to include this property in your environment settings accordingly and
// hopefully it's purpose is clear and self-explanatory.
//
//
const myAppConfigSet: DomainConfig<MyAppConfigSettings> = {
  //
  // development environment settings (based on domain name)
  //
  'myapp.dev.com': {
    authClientId: 'auth-client-id-dev',
    authUserPoolId: 'user-pool-id-dev',
    environment: 'development',
    loggerClientId: 'logger-client-id-dev',
    loggerUrl: 'https://dev.loggingservice.com',
    myAppApiUrl: 'https://api.dev.myapp.com',
  },
  //
  // staging environment settings (based on domain name)
  //
  'myapp.stg.com': {
    authClientId: 'auth-client-id-stg',
    authUserPoolId: 'user-pool-id-stg',
    environment: 'staging',
    loggerClientId: 'logger-client-id-stg',
    loggerUrl: 'https://stg.loggingservice.com',
    myAppApiUrl: 'https://api.stg.myapp.com',
  },
  //
  // production environment settings (based on domain name)
  //
  'myapp.com': {
    authClientId: 'auth-client-id-prod',
    authUserPoolId: 'user-pool-id-prod',
    environment: 'production',
    loggerClientId: 'logger-client-id-prod',
    loggerUrl: 'https://loggingservice.com',
    myAppApiUrl: 'https://api.myapp.com',
  },
  //
  // finally we define settings for when our app is running locally
  //
  // notice that we're still considering local our "development" backend
  // environment but we could map it to any environment we wanted
  //
  localhost: {
    authClientId: 'auth-client-id-dev',
    authUserPoolId: 'user-pool-id-dev',
    environment: 'development',
    loggerClientId: 'logger-client-id-dev',
    loggerUrl: 'https://dev.loggingservice.com',
    myAppApiUrl: 'https://api.dev.myapp.com',
  },
};

//
// here we initialize the runtime config object, utilizing Typescript generics so
// we get the goodness of intelisense when accessing the config in our app
//
// of course using generics here is purely optional if you don't use Typescript
//
export const myAppRuntimeConfig = RuntimeConfig.initialize<MyAppConfigSettings, MyAppEnvironments>(myAppConfigSet);

console.log('The runtime config object we just initialized:');
console.log(myAppRuntimeConfig);

`;
