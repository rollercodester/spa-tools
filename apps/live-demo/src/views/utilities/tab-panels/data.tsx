/* eslint-disable sort-keys-plus/sort-keys */
import { Code, HStack, Text, VStack } from '@chakra-ui/react';
import {
  deepClone,
  deepEqual,
  downloadCsvFile,
  downloadFile,
  getNestedValue,
  jsonStringify,
  omit,
  pick,
} from '@spa-tools/utilities';
import { BsClipboardData } from 'react-icons/bs';
import { DemoViewport, FeatureList, logCode, logComment, logLabel, logTip } from 'showcase/widgets';

export function DataTabPanel() {
  return (
    <DemoViewport
      code={code}
      ctaContent='Run Data Demo'
      ctaIcon={<BsClipboardData fontSize='1.75rem' />}
      headingContent={
        <VStack sx={{ alignItems: 'flex-start', gap: '1rem' }}>
          <Text>
            While websites are about content, web applications are about data. Since data is the lifeblood of a SPA,
            leveraging utilities to help deal with those vital bits can go a long way.
          </Text>
          <Text sx={{ fontWeight: 'normal', lineHeight: 1.5 }}>Here are a few to whet your data appetite:</Text>
          <HStack sx={{ fontWeight: 'normal', gap: '2rem', ml: '1rem' }}>
            <FeatureList
              features={[
                <Code key='deepEqual'>deepEqual</Code>,
                <Code key='deepClone'>deepClone</Code>,
                <Code key='getNestedValue'>getNestedValue</Code>,
              ]}
            />
            <FeatureList
              features={[
                <Code key='omitAndPick'>omit / pick</Code>,
                <Code key='jsonStringify'>jsonStringify</Code>,
                <Code key='downloadFileAndCsv'>downloadFile / downloadCsvFile</Code>,
              ]}
            />
          </HStack>
        </VStack>
      }
      initialOutputMessage='Click the "Run Data Demo" button to execute the demo...'
      language='ts'
      onClickCtaButton={() => {
        logTip('deepEqual');
        logLabel('Deep comparison of two values is such a common task, it really needs no intro.');
        logCode(
          `deepEqual(
  { bar: { for: { bar: 1 } }, foo: 'bar' },
  { foo: 'bar', bar: { for: { bar: 1 } } }
)`,
          `${deepEqual({ bar: { for: { bar: 1 } }, foo: 'bar' }, { foo: 'bar', bar: { for: { bar: 1 } } })}`
        );
        logCode(
          `deepEqual(
  { bar: { for: { bar: 2 } }, foo: 'bar' },
  { foo: 'bar', bar: { for: { bar: 1 } } }
)`,
          `${deepEqual({ bar: { for: { bar: 2 } }, foo: 'bar' }, { foo: 'bar', bar: { for: { bar: 1 } } })}`
        );
        logComment('works with arrays, too!');
        logCode(
          `deepEqual(
  [1, 2, { bar: { for: { bar: 1 } }, foo: 'bar' }],
  [1, 2, { foo: 'bar', bar: { for: { bar: 1 } } }]
)`,
          `${deepEqual(
            [1, 2, { bar: { for: { bar: 1 } }, foo: 'bar' }],
            [1, 2, { foo: 'bar', bar: { for: { bar: 1 } } }]
          )}`
        );

        logTip('deepClone');
        logLabel('Deep cloning an object is another common task that can be a bit tricky.');

        logCode(`const obj1 = { abc: 123, foo: { bar: { baz: 102 } } };
const obj2 = deepClone(obj1);
const obj3 = { ...obj1 };
obj1.foo.bar.baz = 74;`);
        const obj1 = { abc: 123, foo: { bar: { baz: 102 } } };
        const obj2 = deepClone(obj1);
        const obj3 = { ...obj1 };
        obj1.foo.bar.baz = 74;
        logCode(`obj2 copied via deepClone`, `${jsonStringify(obj2)}`);
        logCode(`obj3 copied via spread`, `${jsonStringify(obj3)}`);

        logTip('getNestedValue');
        logLabel(
          'Getting a nested value from an object is by all means not new but this version will return an expected type with a fallback!'
        );
        logCode(
          `getNestedValue(
  { foo: { bar: { baz: 103 } } },
  'foo.bar.baz',
  -1
)`,
          `${getNestedValue<number>({ foo: { bar: { baz: 103 } } }, 'foo.bar.baz', -1)}`
        );
        logComment('here we rely on the fallback value of -1 when the nested value does not exist');
        logCode(
          `getNestedValue(
  { foo: { bar: { baz: 103 } } },
  'foo.bar.foo',
  -1
)`,
          `${getNestedValue<number>({ foo: { bar: { baz: 103 } } }, 'foo.bar.foo', -1)}`
        );

        logTip('omit / pick');
        logLabel('These are doppelgangers of the Omit and Pick utility helpers in TypeScript, only for runtime use!');
        logCode(
          `omit(
  { foo: 'bar', bar: 'baz', baz: 'foo' },
  'foo',
  'baz'
)`,
          `${jsonStringify(omit({ foo: 'bar', bar: 'baz', baz: 'foo' }, 'foo', 'baz'))}`
        );
        logCode(
          `pick(
  { foo: 'bar', bar: 'baz', baz: 'foo' },
  'foo',
  'baz'
)`,
          `${jsonStringify(pick({ foo: 'bar', bar: 'baz', baz: 'foo' }, 'foo', 'baz'))}`
        );

        logTip('jsonStringify');
        logLabel('A graceful version of JSON.stringify that handles circular references and BitInt values.');
        logComment([
          'The first argument is the value to stringify and the second argument is the',
          'space (number or string) to use for indentation when stringifying the value',
        ]);
        logCode(
          `jsonStringify(
  { foo: { bar: { baz: 103 } } },
  2
)`,
          `${jsonStringify({ foo: { bar: { baz: 103 } } }, 2)}`
        );
        const objWithCircularRef: Record<string, unknown> = {
          a: 1,
          b: '2',
        };
        objWithCircularRef.c = objWithCircularRef;
        logComment('circular reference example');
        logCode(
          `const objWithCircularRef = {
  a: 1,
  b: '2',
};
objWithCircularRef.c = objWithCircularRef;
console.log(jsonStringify(objWithCircularRef));
// --> {"a":1,"b":"2","c":"[Circular Reference]"}`,
          `${jsonStringify(objWithCircularRef)}`
        );
        logComment('BigInt example');
        logCode(
          `jsonStringify({ age: 30, bigInt: BigInt(12345678901234567890n), name: 'John' })`,
          `${jsonStringify({ age: 30, bigInt: BigInt(12345678901234567890n), name: 'John' })}`
        );

        logTip('downloadFile');
        logLabel(
          "This is a simple wrapper around the browser's built-in download functionality that supports text, images, and URLs."
        );
        logComment([
          'The first argument is the source, which can be a string or Blob',
          'The second argument is the download file name',
          'And the third argument is the download source type (text, image, or url)',
        ]);
        logCode(`downloadFile('Hello, world!', 'hello.txt', 'text')`);
        downloadFile('Hello, world!', 'hello.txt', 'text');

        logTip('downloadCsvFile');
        logLabel('This is a simple wrapper around the downloadFile function specifically for CSV files.');
        logComment([
          'The first argument is the CSV data (array of comma-delimited strings with each string representing a row)',
          'The second argument is the download file name',
          'And the third argument is an optional array of column names',
        ]);
        logCode(
          `downloadCsvFile(['1,George,Washington', '2,John,Adams', '3,Thomas,Jefferson'], 'first-three-presidents.csv', [
  'Number',
  'First Name',
  'Last Name',
]);`
        );
        downloadCsvFile(['1,George,Washington', '2,John,Adams', '3,Thomas,Jefferson'], 'first-three-presidents.csv', [
          'Number',
          'First Name',
          'Last Name',
        ]);
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
  deepEqual,
  downloadCsvFile,
  downloadFile,
  getNestedValue,
  omit,
  pick,
  jsonStringify
} from '@spa-tools/utilities';

// -----------------------------------------
//
// deepEqual examples
//
// -----------------------------------------

const isEqual1 = deepEqual(
  { bar: { for: { bar: 1 } }, foo: 'bar' },
  { foo: 'bar', bar: { for: { bar: 1 } } }
); // => true

const isEqual2 = deepEqual(
  { bar: { for: { bar: 2 } }, foo: 'bar' },
  { foo: 'bar', bar: { for: { bar: 1 } } }
); // => false

// works with arrays, too!
const isEqual3 = deepEqual(
  [1, 2, { bar: { for: { bar: 1 } }, foo: 'bar' }],
  [1, 2, { foo: 'bar', bar: { for: { bar: 1 } } }]
); // => true

// -----------------------------------------
//
// deepClone example
//
// -----------------------------------------

const obj1 = { abc: 123, foo: { bar: { baz: 102 } } };
const obj2 = deepClone(obj1);
const obj3 = { ...obj1 };
obj1.foo.bar.baz = 74;
// the deep cloned version maintains the original baz value of 102
console.log('obj2 copied via deepClone', obj2);
// the spread operator version does not maintain the original baz value of 102
console.log('obj3 copied via spread', obj3);

// -----------------------------------------
//
// getNestedValue examples
//
// -----------------------------------------

const nestedValue1 = getNestedValue(
  { foo: { bar: { baz: 103 } } },
  'foo.bar.baz',
  -1
); // => 103

// here we rely on the fallback value of -1 when the nested value does not exist
const nestedValue2 = getNestedValue(
  { foo: { bar: { baz: 103 } } },
  'foo.bar.foo',
  -1
); // => -1

// -----------------------------------------
//
// omit / pick examples
//
// -----------------------------------------

const omitted = omit(
  { foo: 'bar', bar: 'baz', baz: 'foo' },
  'foo',
  'baz'
); // => {"bar":"baz"}

const picked = pick(
  { foo: 'bar', bar: 'baz', baz: 'foo' },
  'foo',
  'baz'
); // => {"foo":"bar","baz":"foo"}

// -----------------------------------------
//
// jsonStringify examples
//
// -----------------------------------------

const obj1 = jsonStringify(
  { foo: { bar: { baz: 103 } } },
  // here we request that 2 spaces be used for indentation
  2
); /* =>
'{
   "foo": {
     "bar": {
       "baz": 103
     }
   }
 }' */

// circular references are handled gracefully
const obj2 = {
  a: 1,
  b: '2',
};
obj2.c = obj2;
const obj2 = jsonStringify(obj2);
// => '{"a":1,"b":"2","c":"[Circular Reference]"}'

// BigInt values are handled, too!
const obj3 = jsonStringify({ age: 30, bigInt: BigInt(12345678901234567890n), name: 'John' });
// => '{"age":30,"bigInt":"12345678901234567890","name":"John"}'

// -----------------------------------------
//
// downloadFile example
//
// -----------------------------------------

// the first argument is the source, which can be a string or Blob
// the second argument is the download file name
// and the third argument is the download source type (text, image, or url)
downloadFile('Hello, world!', 'hello.txt', 'text');

// -----------------------------------------
//
// downloadCsvFile example
//
// -----------------------------------------

// the first argument is an array of comma-delimited strings, each string representing a row
// the second argument is the download file name
// and the third argument is an optional array of column names
downloadCsvFile(
  ['1,George,Washington', '2,John,Adams', '3,Thomas,Jefferson'],
  'first-three-presidents.csv',
  [
    'Number',
    'First Name',
    'Last Name',
  ]
);
`;
