import { Code, Text, VStack, Wrap } from '@chakra-ui/react';
import { useQueryState } from '@spa-tools/interaction-hooks';
import { DemoButton, DemoCodeHeading, DemoViewport } from 'showcase/widgets';

export function UseQueryStateTabPanel() {
  return (
    <DemoViewport
      code={CODE}
      demoWidget={<DemoWidget />}
      headingContent={
        <VStack sx={{ alignItems: 'flex-start', gap: '1rem' }}>
          <Text>
            Have you ever wanted a view in your React application to interact with and respond to the browser URL&apos;s
            querystring values without triggering hard reloads?
          </Text>
          <Text sx={{ fontWeight: 'normal' }}>
            Maybe your users want to bookmark a view with a particular filter-set they&apos;ve defined? Or maybe you
            want to remember the sort column and direction settings a user last selected for a view? So many scenarios,
            if only it wasn&apos;t a pain, right?
          </Text>
          <Text sx={{ fontWeight: 'normal' }}>
            Pain no more! <Code>useQueryState</Code> is here to save the day!
          </Text>
        </VStack>
      }
      inputWidget={<DemoCodeHeading codeText='useQueryState' />}
      language='tsx'
    />
  );
}

//
//
// helpers
//
//

interface SortColumnInfo {
  sortColumn: string;
  sortDirection: 'ASC' | 'DESC';
}

function DemoWidget() {
  const { queryState, setQueryState } = useQueryState<SortColumnInfo>(true);

  return (
    <VStack sx={{ alignItems: 'flex-start', gap: '1rem', p: '1.5rem' }}>
      <Wrap>
        <DemoButton
          onClick={() => {
            setQueryState({ sortColumn: 'age', sortDirection: 'DESC' });
          }}
          text='Sort by Age (DESC)'
        />
        <DemoButton
          onClick={() => {
            setQueryState({ sortColumn: 'name', sortDirection: 'ASC' });
          }}
          text='Sort by Name (ASC)'
        />
        <DemoButton
          onClick={() => {
            window.location.href = window.location.href.split('?')[0];
          }}
          text='Hard reload to test cache'
        />
        <DemoButton
          onClick={() => {
            setQueryState(null);
          }}
          text='Clear sort settings'
        />
      </Wrap>
      <Text
        sx={{
          border: '3px dashed',
          borderColor: 'whiteAlpha.500',
          color: 'whiteAlpha.700',
          fontWeight: '500',
          px: '0.5rem',
          py: '0.25rem',
          width: '100%',
        }}
      >
        {queryState === null ? (
          `Click one of the "Sort by" buttons and watch the browser's URL and also how this text changes!`
        ) : (
          <span>
            Sort column <strong>{queryState.sortColumn}</strong> in <em>{queryState.sortDirection}</em> direction!
            (checkout the URL too!)
          </span>
        )}
      </Text>
    </VStack>
  );
}

//
//
// DISPLAY CODE
//
//

const CODE = `import { useQueryState } from '@spa-tools/interaction-hooks';

// here we elect to define the shape for our query state, which we
// pass to the useQueryState hook as a generic type argument, but
// of course this is purely optional
interface SortColumnInfo {
  sortColumn: string;
  sortDirection: 'ASC' | 'DESC';
}

function UseQueryStateDemo() {
  // we pass true to the useQueryState hook to enable the cache (i.e. localStorage)
  // feature so that the query state for this view is remembered across page reloads
  const { queryState, setQueryState } = useQueryState<SortColumnInfo>(true);

  return (
    <div>
      <div>
        <button
          onClick={() => {
            // here we set the query state to sort by age in descending order
            setQueryState({ sortColumn: 'age', sortDirection: 'DESC' });
          }}
        >
          Sort by Age (DESC)
        </button>
        <button
          onClick={() => {
            // here we set the query state to sort by name in ascending order
            setQueryState({ sortColumn: 'name', sortDirection: 'ASC' });
          }}
        >
          Sort by Name (ASC)
        </button>
        <button
          onClick={() => {
            // here we hard reload the page with querystring removed
            // to test the cache feature
            window.location.href = window.location.href.split('?')[0];
          }}
        >
          Hard reload to test cache
        </button>
        <button
          onClick={() => {
            // here we clear the query state
            setQueryState(null);
          }}
        >
          Clear sort settings
        </button>
      </div>
      <div>
        {queryState === null ? (
          \`Click one of the "Sort by" buttons and watch the browser's URL and also how this text changes!\`
        ) : (
          <span>
            Sort column <strong>{queryState.sortColumn}</strong> in <em>{queryState.sortDirection}</em> direction! (checkout the URL too!)
          </span>
        )}
      </div>
    </div>
  );
}`;
