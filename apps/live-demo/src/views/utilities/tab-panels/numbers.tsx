import { Code, HStack, Text, VStack } from '@chakra-ui/react';
import { ensureNum, formatQuotient, humanizeHrs, humanizeMs, humanizeUnit, roundToNearest } from '@spa-tools/utilities';
import { GoNumber } from 'react-icons/go';
import { DemoViewport, FeatureList, logCode, logComment, logLabel, logTip } from 'showcase/widgets';

export function NumbersTabPanel() {
  return (
    <DemoViewport
      code={code}
      ctaContent='Run Numbers Demo'
      ctaIcon={<GoNumber fontSize='2rem' />}
      headingContent={
        <VStack sx={{ alignItems: 'flex-start', gap: '1rem' }}>
          <Text>There is no escaping numbers in an application and all kinds of flavors, too.</Text>
          <Text sx={{ fontWeight: 'normal', lineHeight: 1.5 }}>
            Here are just a few utils to help with numerics; be sure to check out the package for more:
          </Text>
          <HStack sx={{ fontWeight: 'normal', gap: '2rem', ml: '1rem' }}>
            <FeatureList
              features={[
                <Code key='ensureNum'>ensureNum</Code>,
                <Code key='formatQuotient'>formatQuotient</Code>,
                <Code key='roundToNearest'>roundToNearest</Code>,
              ]}
            />
            <FeatureList
              features={[
                <Code key='humanizeUnit'>humanizeUnit</Code>,
                <Code key='humanizeHrs'>humanizeHrs</Code>,
                <Code key='humanizeMs'>humanizeMs</Code>,
              ]}
            />
          </HStack>
        </VStack>
      }
      initialOutputMessage='Click the "Run Numbers Demo" button to execute the demo...'
      language='ts'
      onClickCtaButton={() => {
        logTip('ensureNum');
        logLabel(
          'Just like it sounds, ensures a number is valid (either natively or via parsing) and if not returns a fallback.'
        );
        logCode("ensureNum('123', 0)", `${ensureNum('123', 0)}`);
        logCode("ensureNum('abc', -1)", `${ensureNum('abc', -1)}`);

        logTip('formatQuotient');
        logLabel(
          'Calculates and then formats a quotient with a given decimal precision and optional grouping (enabled by default).'
        );
        logCode(
          'formatQuotient(1234567, { decimalPlaces: 2, divisor: 89 })',
          `${formatQuotient(1234567, { decimalPlaces: 2, divisor: 89 })}`
        );
        logComment('No grouping and 4 decimal places...');
        logCode(
          'formatQuotient(1234567, { decimalPlaces: 4, divisor: 89, useGrouping: false }',
          `${formatQuotient(1234567, { decimalPlaces: 4, divisor: 89, useGrouping: false })}`
        );

        logTip('roundToNearest');
        logLabel('Simply rounds a number to the nearest specified number decimal places.');
        logCode('roundToNearest(123.4567, 2)', `${roundToNearest(123.4567, 2)}`);
        logCode('roundToNearest(1.234567, 5)', `${roundToNearest(1.234567, 5)}`);
        logCode('roundToNearest(12345.67, 1)', `${roundToNearest(12345.67, 1)}`);

        logTip('humanizeUnit');
        logLabel(
          'Returns number formatted with appropriate basis and unit list. Defaults to 1000 basis with K,M,B,T units using one decimal place.'
        );
        logComment(
          'A tuple is returned so that the number and unit can be used separately to meet variable UX design requirements'
        );
        logCode('humanizeUnit(1234567)', `${humanizeUnit(1234567)}`);
        logComment('File size formatting with 1024 basis and 2 decimal places...');
        logCode(
          `humanizeUnit(
  1234567,
  {
    basis: 1024,
    decimalPlaces: 2,
    units: ['KB', 'MB', 'GB', 'TB']
  }
)`,
          `${humanizeUnit(1234567, {
            basis: 1024,
            decimalPlaces: 2,
            units: ['KB', 'MB', 'GB', 'TB'],
          })}`
        );
        logComment('10-based years formatting...');
        logCode(
          `humanizeUnit(
  824,
  {
    basis: 10,
    units: ['decades', 'centuries', 'millennium', 'megayears', 'gigayears']
  }
)`,
          `${humanizeUnit(824, {
            basis: 10,
            units: ['decades', 'centuries', 'millennium', 'megayears', 'gigayears'],
          })}`
        );

        logTip('humanizeHrs');
        logLabel(
          'Converts a number of hours into the largest applicable unit of either year, month, week, or day, returning a tuple of resulting number with requested decimal places and respective human-readable unit.'
        );
        logComment(
          'A tuple is returned so that the number and unit can be used separately to meet variable UX design requirements'
        );
        logCode('humanizeHrs(36400)', `${humanizeHrs(36400)}`);
        logCode('humanizeHrs(2325, 0)', `${humanizeHrs(2325, 0)}`);
        logCode('humanizeHrs(1643343, 3)', `${humanizeHrs(1643343, 3)}`);
        logCode('humanizeHrs(23, 2)', `${humanizeHrs(23, 2)}`);

        logTip('humanizeMs');
        logLabel(
          'Converts a number of milliseconds into the largest applicable unit of either year, month, week, day, hour, minute or second, returning a tuple of resulting number with requested decimal places and respective human-readable unit.'
        );
        logComment(
          'A tuple is returned so that the number and unit can be used separately to meet variable UX design requirements'
        );
        logCode('humanizeMs(27513000000)', `${humanizeMs(27513000000)}`);
        logCode('humanizeMs(2722000, 2)', `${humanizeMs(2722000, 2)}`);
        logCode('humanizeMs(688400000, 3)', `${humanizeMs(688400000, 3)}`);
        logCode('humanizeMs(86400000, 0)', `${humanizeMs(86400000, 0)}`);
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
  ensureNum,
  formatQuotient,
  humanizeHrs,
  humanizeMs,
  humanizeUnit,
  roundToNearest,
} from '@spa-tools/utilities';

//
// ensureNum examples
//
ensureNum('123', 0); // 123
ensureNum('abc', -1); // -1

//
// formatQuotient examples
//
formatQuotient(1234567, { divisor: 89, decimalPlaces: 2 }); // 13,871.54
formatQuotient(1234567, { divisor: 89, decimalPlaces: 4, useGrouping: false }); // 13871.5393

//
// roundToNearest examples
//
roundToNearest(123.4567, 2); // 123.46
roundToNearest(1.234567, 5); // 1.23457
roundToNearest(12345.67, 1); // 12345.7

//
// humanizeUnit examples
//
humanizeUnit(1234567); // 1.2M
humanizeUnit(
  1234567,
  {
    basis: 1024,
    decimalPlaces: 2,
    units: ['B', 'KB', 'MB', 'GB', 'TB']
  }
); // ['1.18', 'MB']
humanizeUnit(
  824,
  {
    basis: 10,
    units: ['decades', 'centuries', 'millennium', 'meayears', 'gigayears']
  }
); // ['8.2', 'centuries']

//
// humanizeHrs examples
//
humanizeHrs(36400); // [4.2, 'years']
humanizeHrs(2325, 0); // [3, 'months']
humanizeHrs(1643343, 3); // [187.596, 'years']
humanizeHrs(23, 2); // [0.96, 'days']

//
// humanizeMs examples
//
humanizeMs(27513000000); // [10.6, 'months']
humanizeMs(2722000, 2); // [45.37, 'minutes']
humanizeMs(688400000, 3); // [1.138, 'weeks']
humanizeMs(86400000, 0); // [1, 'day']
`;
