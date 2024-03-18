import { Box, Code, Text, VStack } from '@chakra-ui/react';
import { ExecOnce, debounce, sleep } from '@spa-tools/utilities';
import { RiFlowChart } from 'react-icons/ri';
import { DemoViewport, FeatureList, logCode, logComment, logLabel, logTip } from 'showcase/widgets';

export function ExecutionControlTabPanel() {
  return (
    <DemoViewport
      code={code}
      ctaContent='Run Execution Control Demo'
      ctaIcon={<RiFlowChart fontSize='2rem' />}
      headingContent={
        <VStack sx={{ alignItems: 'flex-start', gap: '1rem' }}>
          <Text>
            Code execution in a single-threaded callstack can get tricky, especially when comingling with message/render
            loops.
          </Text>
          <Text sx={{ fontWeight: 'normal', lineHeight: 1.5 }}>
            Here&apos;s a few tricks you can keep up your sleeve in case you ever need to tame the execution beast:
          </Text>
          <Box sx={{ fontWeight: 'normal', gap: '2rem', ml: '1rem' }}>
            <FeatureList
              features={[
                <Code key='ExecOnce'>ExecOnce</Code>,
                <Code key='debounce'>debounce</Code>,
                <Code key='sleep'>sleep</Code>,
              ]}
            />
          </Box>
        </VStack>
      }
      initialOutputMessage='Click the "Run Execution Control Demo" button to execute the demo...'
      language='ts'
      onClickCtaButton={async () => {
        logTip('ExecOnce');
        logLabel('Ever needed to make sure a function is called once and only once?');
        logCode(`let execOnceCount = 0;
const logOnce = new ExecOnce(() => {
  execOnceCount++;
  console.log('This is the logOnce callback and I have been called', execOnceCount, 'time(s)!');
});
for (let i = 0; i < 50; i++) {
  logOnce.exec();
}`);
        logComment("For good measure, let's call the function again after 500ms");
        logCode(`setTimeout(() => {
  logOnce.exec();
}, 500);`);
        let execOnceCount = 0;
        const logOnce = new ExecOnce(() => {
          execOnceCount++;
          console.log('This is the logOnce callback and I have been called', execOnceCount, 'time(s)!');
        });
        for (let i = 0; i < 50; i++) {
          logOnce.exec();
        }
        setTimeout(() => {
          logOnce.exec();
        }, 500);

        logTip('debounce');
        logLabel("Debounce needs no introduction so let's just dive in!");
        let debounceCount = 0;
        const debouncedLog = debounce(() => {
          debounceCount++;
          console.log('This is the debounceLog and I have been called', debounceCount, 'time(s)!');
        }, 500);
        for (let i = 0; i < 50; i++) {
          debouncedLog();
        }
        setTimeout(() => {
          debouncedLog();
        }, 550);

        logCode(`let debounceCount = 0;
const debouncedLog = debounce(() => {
  debounceCount++;
  console.log('This is the debounceLog and I have been called', debounceCount, 'time(s)!');
}, 500);
for (let i = 0; i < 50; i++) {
  debouncedLog();
}`);

        logComment('try again after 550ms and function should now be called, but only for the 2nd time');
        logCode(`setTimeout(() => {
  debouncedLog();
}, 550);`);

        await sleep(2000);

        logTip('sleep');
        logLabel('Ever needed to pause async execution for a bit?');
        logCode('I am about to sleep for 3 seconds...');
        logCode('await sleep(3000);');
        await sleep(3000);
        logCode('I am awake now!');
      }}
    />
  );
}

//
//
// DISPLAY CODE
//
//

const code = `import { ExecOnce, debounce, sleep } from '@spa-tools/utilities';

//
// ExecOnce example where we ensure a function only executes once even
// though it gets called 50 times in a loop and once again after a delay
//
let execOnceCount = 0;
const logOnce = new ExecOnce(() => {
  execOnceCount++;
  console.log('This is the logOnce callback and I have been called', execOnceCount, 'time(s)!');
});
for (let i = 0; i < 50; i++) {
  logOnce.exec();
}
// for good measure, let's call the function again after 500ms
setTimeout(() => {
  logOnce.exec();
}, 500);

//
// debounce example where we flood a function with 50 calls
//
let debounceCount = 0;
const debouncedLog = debounce(() => {
  debounceCount++;
  console.log('This is the debounceLog and I have been called', debounceCount, 'time(s)!');
}, 500);
for (let i = 0; i < 50; i++) {
  debouncedLog();
}
// try again after 550ms and function should now be called, but only for the 2nd time
setTimeout(() => {
  debouncedLog();
}, 550);

//
// sleep example where we pause execution for 3 seconds
//
console.log('I am about to sleep for 3 seconds...');
await sleep(3000);
console.log('I am awake now!');
`;
