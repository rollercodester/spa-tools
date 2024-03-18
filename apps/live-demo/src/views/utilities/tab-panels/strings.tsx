import { Code, HStack, Text, VStack } from '@chakra-ui/react';
import { base64ToBytes, bytesToBase64, looksLikeBase64, makeReadable, separateWords } from '@spa-tools/utilities';
import { VscWordWrap } from 'react-icons/vsc';
import { DemoViewport, FeatureList, logCode, logComment, logLabel, logTip } from 'showcase/widgets';

export function StringsTabPanel() {
  return (
    <DemoViewport
      code={code}
      ctaContent='Run Strings Demo'
      ctaIcon={<VscWordWrap fontSize='2.25rem' />}
      headingContent={
        <VStack sx={{ alignItems: 'flex-start', gap: '1rem' }}>
          <Text>Just like numbers, the usage of strings is here to stay in software applications.</Text>
          <Text sx={{ fontWeight: 'normal', lineHeight: 1.5 }}>
            Native string functions provide a lot of coverage; even still, here is a smidgeon of edge-case utils. Also,
            be sure to check out the package if there&apos;s something else you&apos;re looking for:
          </Text>
          <HStack sx={{ fontWeight: 'normal', gap: '2rem', ml: '1rem' }}>
            <FeatureList
              features={[<Code key='makeReadable'>makeReadable</Code>, <Code key='separateWords'>separateWords</Code>]}
            />
            <FeatureList
              features={[
                <Code key='base64ToBytes'>base64ToBytes</Code>,
                <Code key='bytesToBase64'>bytesToBase64</Code>,
                <Code key='looksLikeBase64'>looksLikeBase64</Code>,
              ]}
            />
          </HStack>
        </VStack>
      }
      initialOutputMessage='Click the "Run Strings Demo" button to execute the demo...'
      language='ts'
      onClickCtaButton={() => {
        logTip('makeReadable');
        logLabel('Formats a value by inserting a common separator between specified grouping.');
        logComment('Defaults to groups of 4 and a space separator...');
        logCode('makeReadable(1111222233334444)', `${makeReadable(1111222233334444)}`);
        logComment('Perhaps for a phone number...');
        logCode(`makeReadable(12345678901, [1, 3, 3, 4], '-')`, `${makeReadable(12345678901, [1, 3, 3, 4], '-')}`);
        logComment('Or for a masked SSN...');
        logCode(`makeReadable(*****6789, [3, 2, 4], '-')`, `${makeReadable('*****6789', [3, 2, 4], '-')}`);

        logTip('separateWords');
        logLabel('Separates words in a string by a separator.');
        logComment('Defaults to a space separator...');
        logCode(`separateWords('helloWorld')`, separateWords('helloWorld'));
        logComment('Here we specify true to ensure title casing...');
        logCode(`separateWords('helloWorld', ' ', true)`, separateWords('helloWorld', ' ', true));
        logComment('Here we specify a dash separator...');
        logCode(`separateWords('helloWorld', '-')`, separateWords('helloWorld', '-'));

        logTip('base64ToBytes');
        logLabel('Converts a base64 string to a Uint8Array.');
        logCode(`base64ToBytes('aGVsbG8=')`, base64ToBytes('aGVsbG8=').toString());

        logTip('bytesToBase64');
        logLabel('Converts a Uint8Array to a base64 string.');
        logCode(
          `bytesToBase64(new Uint8Array([104, 101, 108, 108, 111]))`,
          bytesToBase64(new Uint8Array([104, 101, 108, 108, 111]))
        );

        logTip('looksLikeBase64');
        logLabel('Checks if a string looks like a base64 string.');
        logCode(`looksLikeBase64('aGVsbG8=')`, `${looksLikeBase64('aGVsbG8=')}`);
        logCode(`looksLikeBase64('hello=')`, `${looksLikeBase64('hello=')}`);
      }}
    />
  );
}

//
//
// DISPLAY CODE
//
//

const code = `import {
  base64ToBytes,
  bytesToBase64,
  makeReadable,
  looksLikeBase64,
  separateWords
} from '@spa-tools/utilities';

//
// makeReadable
//
makeReadable(1111222233334444); // '1111 2222 3333 4444'
makeReadable(12345678901, [1, 3, 3, 4], '-'); // '1-234-567-8901'
makeReadable('*****6789', [3, 2, 4], '-'); // '***-**-6789'

//
// separateWords
//
separateWords('helloWorld'); // 'hello World'
separateWords('helloWorld', ' ', true); // 'Hello World'
separateWords('helloWorld', '-'); // 'hello-World'

//
// base64ToBytes
//
base64ToBytes('aGVsbG8='); // [104, 101, 108, 108, 111]

//
// bytesToBase64
//
bytesToBase64(new Uint8Array([104, 101, 108, 108, 111])); // 'aGVsbG8='

//
// looksLikeBase64
//
looksLikeBase64('aGVsbG8='); // true
`;
