import { Link, Text, VStack } from '@chakra-ui/react';
import { RuntimeConfig } from '@spa-tools/runtime-config';
import { GiStaticWaves } from 'react-icons/gi';
import { DemoViewport, logLabel, logTip } from 'showcase/widgets';
import { MyAppConfigSettings, MyAppEnvironments } from '../myapp-runtime-config';
import localObfuscatedConfig from '../myapp-runtime-config/myapp-runtime-config-obfuscated.txt?raw';

export type ObfuscationDemo = 'demo' | 'fileToObfuscate' | 'fileToDeobfuscate';

export function ObfuscationTabPanel() {
  return (
    <DemoViewport
      code={DEMO_CODE}
      ctaContent='Run Obfuscation Demo'
      ctaIcon={<GiStaticWaves fontSize='1.75rem' />}
      headingContent={
        <VStack sx={{ alignItems: 'flex-start', gap: '1rem' }}>
          <Text>
            With the Runtime Config, all of your environment configs get bundled into your build, which has an advantage
            over other .env approaches of keeping your transipiled bits unchanged and the same between build
            environments.
          </Text>
          <Text sx={{ fontWeight: 'normal', lineHeight: 1.5 }}>
            However, a potential downside to this is that all environment configs get leaked to every environment you
            deploy to. While the secure solution to this concern would be to utilize VPN, WAF, etc. in your lower
            environments, the Runtime Config addresses this nonetheless by providing an obfuscation utility and
            accepting an encoded config so you can encode+encrypt your file config as a static asset. This static,
            encrypted config can then be used to initialize the Runtime Config, which will in turn automatically
            decrypt+decode the config at runtime.
          </Text>
          <Text sx={{ fontWeight: 'normal', lineHeight: 1.5 }}>
            {/* TODO: Update this link to the correct URL */}
            For an example of how to create a local, obfuscated config-file at build time, refer to the{' '}
            <Link
              color='purple.500'
              href='http://localhost:3000/runtime-config/guides/obfuscation'
              sx={{ fontWeight: 700 }}
              target='_blank'
            >
              Obfuscation Guide
            </Link>
            .
          </Text>
        </VStack>
      }
      initialOutputMessage='Click the "Run Obfuscation Demo" button to execute the demo...'
      language='ts'
      onClickCtaButton={async () => {
        logTip('OBFUSCATION DEMO');

        logLabel('\nObfuscated domain-config as imported from local txt file:');
        console.log(localObfuscatedConfig);

        // now let's initialize a new runtime config straight from the imported obfuscated txt file
        const myAppConfig2 = await RuntimeConfig.initializeObf<MyAppConfigSettings, MyAppEnvironments>(
          localObfuscatedConfig
        );

        logLabel('Runtime Config initialized from obfuscated text file:');
        console.log(myAppConfig2);

        logLabel('The underlying settings that the Runtime Config automatically deobfuscated at runtime:');
        console.log(myAppConfig2.settings);
      }}
    />
  );
}

//
//
// DISPLAY CODE
//
//

const DEMO_CODE = `import { browserDeobfuscateConfig, browserObfuscateConfig } from '@spa-tools/runtime-config';
import localObfuscatedConfig from './myapp-config-obf.txt?raw';

/********************************************
   OBFUSCATION DEMO
********************************************/

console.log('Obfuscated domain-config as imported from local txt file:');
console.log(localObfuscatedConfig);

// now let's initialize a new runtime config straight from the imported obfuscated text file
const myAppConfig = await RuntimeConfig.initializeObf(localObfuscatedConfig);

console.log('Runtime Config initialized from obfuscated text file:');
console.log(myAppConfig);

console.log('The underlying settings that the Runtime Config automatically deobfuscated at runtime:');
console.log(myAppConfig.settings);
`;
