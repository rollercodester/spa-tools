import { Box, Code, Text, VStack } from '@chakra-ui/react';
import { areDatesEqual, inlineSwitch, isNotEmptyRecord, isRecord, tern } from '@spa-tools/utilities';
import { TbArrowFork } from 'react-icons/tb';
import { DemoViewport, FeatureList, logCode, logComment, logLabel, logTip } from 'showcase/widgets';

export function ConditionalsTabPanel() {
  return (
    <DemoViewport
      code={code}
      ctaContent='Run Conditionals Demo'
      ctaIcon={<TbArrowFork fontSize='1.75rem' />}
      headingContent={
        <VStack sx={{ alignItems: 'flex-start', gap: '1rem' }}>
          <Text>
            Conditional abstractions can certainly be overdone and sometimes can even be considered lazy code, but
            striking the right balance can help us minimize code while keeping things nice and DRY.
          </Text>
          <Text sx={{ fontWeight: 'normal', lineHeight: 1.5 }}>
            Here&apos;s a few conditional abstractions to consider:
          </Text>
          <Box sx={{ fontWeight: 'normal', gap: '2rem', ml: '1rem' }}>
            <FeatureList
              features={[
                <Code key='tern'>tern</Code>,
                <Code key='isRecord'>isRecord</Code>,
                <Code key='isNotEmptyRecord'>isNotEmptyRecord</Code>,
                <Code key='areDatesEqual'>areDatesEqual</Code>,
                <Code key='inlineSwitch'>inlineSwitch</Code>,
              ]}
            />
          </Box>
        </VStack>
      }
      initialOutputMessage='Click the "Run Conditionals Demo" button to execute the demo...'
      language='ts'
      onClickCtaButton={() => {
        logTip('tern');
        logLabel(
          'Ever wanted to use the ternary operator with a fallback when the conditional value is null or undefined?'
        );
        logCode(
          "tern(getRandomVote(), 'Yea!', 'Nay!', 'Abstained')",
          `'${tern(getRandomVote(), 'Yea!', 'Nay!', 'Abstained')}'`
        );

        logTip('isRecord');
        logLabel('Ever needed to make sure a value is a Record (aka POJO) that can be safely serialized?');
        logCode('isRecord(new Date())', `${isRecord(new Date())}`);
        logCode('isRecord(new Headers())', `${isRecord(new Headers())}`);
        logCode('isRecord("I am a string!")', `${isRecord('I am a string!')}`);
        logCode('isRecord({ foo: "bar" })', `${isRecord({ foo: 'bar' })}`);

        logTip('isNotEmptyRecord');
        logLabel("Ever needed to make sure a value is a valid Record and that it's not empty?");
        logCode('isNotEmptyRecord({ foo: "bar" })', `${isNotEmptyRecord({ foo: 'bar' })}`);
        logCode('isNotEmptyRecord({})', `${isNotEmptyRecord({})}`);
        logComment('if a non-Record value is passed, call will return null');
        logCode('isNotEmptyRecord(123456)', `${isNotEmptyRecord(123456)}`);

        logTip('areDatesEqual');
        logLabel(
          "There is more than meets the eye with this function because it doesn't just accept date objects. You can pass in two dates, two numbers, two strings, or a combination thereof. And the best part is you can specify the precision of the comparison!"
        );
        logCode(
          `areDatesEqual(new Date(), new Date().getTime() + 1)`,
          `${areDatesEqual(new Date(), new Date().getTime() + 1)}`
        );
        logComment('this time we compare the dates to the second');
        logCode(
          `areDatesEqual(new Date(), new Date().getTime() + 1, 'second')`,
          `${areDatesEqual(new Date(), new Date().getTime() + 1, 'second')}`
        );

        logTip('inlineSwitch');
        logLabel(
          'This mimics a switch statement but can be passed inline to functions as an argument, which is super handy for React components whose render output can be multiple variations based on state.'
        );
        logComment([
          'This is a simple example that demos how a single console.log call',
          'can control flow of multiple outputs via the switch/case pattern',
        ]);
        const respStatus = 404;
        logCode(
          `const respStatus = 404;
console.log(
  inlineSwitch<number, string>(respStatus, {
    200: 'Yay, call succeeded :-)',
    404: 'Hmmm, item not found :-/',
    500: 'Ouch, something went bang :-(',
  })
);`,
          inlineSwitch<number, string>(respStatus, {
            200: 'Yay, call succeeded :-)',
            404: 'Hmmm, item not found :-/',
            500: 'Ouch, something went bang :-(',
          })
        );

        const activeTab = 2;
        logLabel('A more poignant example is when used in a React function component');
        logCode(
          `const [activeTab, setActiveTab] = useState(2);
return (
  <>
    {inlineSwitch<number, JSX.Element>(activeTab, {
      1: <div>TabPanel1</div>,
      2: <div>TabPanel2</div>,
      3: <div>TabPanel3</div>,
    })}
  </>
);`,
          inlineSwitch<number, string>(activeTab, {
            1: 'rendering <div>TabPanel1</div>',
            2: 'rendering <div>TabPanel2</div>',
            3: 'rendering <div>TabPanel3</div>',
          })
        );
      }}
    />
  );
}

//
//
// DISPLAY CODE
//
//

const code = `import { areDatesEqual, isNotEmptyRecord, isRecord, tern } from '@spa-tools/utilities';
import { getRandomVote } from './get-random-vote';

//
// ternary example tests a value against true, false, and null/undefined
//
console.log(
  // the getRandomVote function randomly returns either a boolean or null
  tern(getRandomVote(), 'Yea!', 'Nay!', 'Abstained')
);

//
// isRecord example will return true if the value is a Record (aka POJO)
//
console.log('Is record:', isRecord(new Date()));

//
// isNotEmptyRecord example will return true if the value is a Record AND has properties
// but will return false if the value is a Record with no properties; finally, it will
// return null if the value is not a valid Record
//
console.log('Is NOT empty record:', isNotEmptyRecord({ foo: 'bar' }));

//
// areDatesEqual example will return true if the two dates are equal, but there is more
// than meets the eye with this function because it doesn't just accept date objects as
// you can pass in two dates, two numbers, two strings, or a combiniation thereof.
//
// And the best part is you can specify the precision of the comparison!
//
console.log('Are dates equal:', areDatesEqual(new Date(), new Date().getTime() + 1));
console.log('Are dates equal:', areDatesEqual(new Date(), new Date().getTime() + 1, 'second'));

//
//
// inlineSwitch mimics a switch statement but can be passed inline to functions as an argument
//
//

// simple example that demos how a single console.log call can control flow of multiple outputs
const respStatus = 404;
console.log(
  inlineSwitch<number, string>(respStatus, {
    200: 'Yay, call succeeded :-)',
    404: 'Hmmm, item not found :-/',
    500: 'Ouch, something went bang :-(',
  })
);

// a more poignant example for inlineSwitch is a React function component
const [activeTab, setActiveTab] = useState(2);
return (
  <>
    {inlineSwitch<number, JSX.Element>(activeTab, {
      1: <div>TabPanel1</div>,
      2: <div>TabPanel2</div>,
      3: <div>TabPanel3</div>,
    })}
  </>
);
`;

function getRandomVote(): boolean | null {
  const randomNum = Math.random();
  if (randomNum < 0.33) {
    return true;
  } else if (randomNum < 0.66) {
    return false;
  } else {
    return null;
  }
}
