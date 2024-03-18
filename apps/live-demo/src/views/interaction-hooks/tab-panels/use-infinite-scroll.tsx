import { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Code, Heading, ListItem, Text, UnorderedList, VStack, Wrap } from '@chakra-ui/react';
import { useCallEndpoint } from '@spa-tools/api-client';
import { useInfiniteScroll } from '@spa-tools/interaction-hooks';
import { DemoButton, DemoCodeHeading, DemoViewport } from 'showcase/widgets';

export function UseInfiniteScrollTabPanel() {
  return (
    <DemoViewport
      code={CODE}
      demoWidget={<DemoWidget />}
      headingContent={
        <VStack sx={{ alignItems: 'flex-start', gap: '1rem' }}>
          <Text>
            Stop frustrating your users with antiquated pagination controls and instead offer them an infinite scroll
            feature.
          </Text>
          <Text sx={{ fontWeight: 'normal' }}>
            Not worth the hassle you say? Let&apos;s see how easy is can be with the <Code>useInfiniteScroll</Code>{' '}
            hook.
          </Text>
        </VStack>
      }
      inputWidget={<DemoCodeHeading codeText='useInfiniteScroll' />}
      language='tsx'
    />
  );
}

//
//
// helpers
//
//

interface Recipe {
  difficulty: string;
  id: number;
  name: string;
}

function useGetRecipes() {
  return useCallEndpoint<Recipe[]>(
    'https://dummyjson.com/recipes',
    {
      requestOptions: { recordLimit: 10 },
      serverModelOptions: { jsonDataDotPath: 'recipes' },
    },
    true
  );
}

function DemoWidget() {
  const scrollTargetRef = useRef<HTMLDivElement>(null);
  const [disableScroll, setDisableScroll] = useState(false);
  const [bottomThresholdPercent, setBottomThresholdPercent] = useState(10);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);
  const isScrolling = useInfiniteScroll(scrollTargetRef, disableScroll, bottomThresholdPercent);
  const [getRecipes, recipesResult, isRecipesCallPending, clearRecipes] = useGetRecipes();

  const handleGetRecipes = useCallback(() => {
    const recordCount = recipesResult?.data?.length ?? -1;
    const totalCount = recipesResult?.total ?? 0;

    setCount(recordCount);
    setTotal(totalCount);

    if (!isRecipesCallPending && recordCount < totalCount) {
      getRecipes();
    }
  }, [getRecipes, isRecipesCallPending, recipesResult?.data?.length, recipesResult?.total]);

  useEffect(() => {
    if (isScrolling) {
      handleGetRecipes();
    }
  }, [handleGetRecipes, isScrolling]);

  return (
    <VStack sx={{ alignItems: 'flex-start', flexGrow: 1, gap: '1rem', p: '1.5rem', width: '100%' }}>
      <Wrap>
        <DemoButton
          onClick={() => {
            setDisableScroll((curr) => !curr);
          }}
          text={`${disableScroll ? 'ENABLE' : 'DISABLE'} infinite scroll`}
        />
        <DemoButton
          onClick={() => {
            setBottomThresholdPercent((curr) => (curr === 10 ? 50 : 10));
          }}
          text={`Change bottom threshold from ${bottomThresholdPercent}% to ${
            bottomThresholdPercent === 10 ? '50%' : '10%'
          }`}
        />
        <DemoButton
          onClick={() => {
            clearRecipes();
            setTotal(0);
            setCount(0);
          }}
          text='Reset Recipes'
        />
        <Heading size='md' sx={{ alignSelf: 'center', color: '#FFFFFF', ml: '2rem', py: '0.5rem' }}>
          {count && total ? `${count === total ? `All ${count}` : `${count} of ${total}`} recipes retrieved!` : ''}
          {count && total && count < total ? ' (scroll recipe list to load more)' : ''}
        </Heading>
      </Wrap>
      <Box
        sx={{
          bgColor: 'whiteAlpha.200',
          color: 'whiteAlpha.800',
          height: '300px',
          overflowY: 'auto',
          px: '1rem',
          py: '0.5rem',
          width: '100%',
        }}
      >
        <UnorderedList>
          {recipesResult?.data?.map((recipe) => (
            <ListItem key={recipe.id}>{`${recipe.name} (${recipe.difficulty})`}</ListItem>
          ))}
        </UnorderedList>
        {isRecipesCallPending && <Text>Loading recipes...</Text>}
        <Box ref={scrollTargetRef} />
      </Box>
    </VStack>
  );
}

//
//
// DISPLAY CODE
//
//

const CODE = `import { useCallback, useEffect, useRef, useState } from 'react';
import { useCallEndpoint } from '@spa-tools/api-client';
import { useInfiniteScroll } from '@spa-tools/interaction-hooks';

// here we create a custom hook to fetch recipes from a server
// using the useCallEndpoint hook from the @spa-tools/api-client package
function useGetRecipes() {
  return useCallEndpoint(
    'https://dummyjson.com/recipes',
    {
      requestOptions: { recordLimit: 10 },
      serverModelOptions: { jsonDataDotPath: 'recipes' },
    },
    // we pass true to enable appending of new records
    true
  );
}

function UseInfiniteScrollDemo() {
  // this will hold the ref to our scroll target, which is just a
  // div that we place below our list of recipes to act as a
  // sentinel for scroll intersection
  const scrollTargetRef = useRef<HTMLDivElement>(null);
  const [disableScroll, setDisableScroll] = useState(false);
  const [bottomThresholdPercent, setBottomThresholdPercent] = useState(10);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);
  const [getRecipes, recipesResult, isRecipesCallPending, clearRecipes] = useGetRecipes();

  // anytime our scroll target is intersected for vertical scroll, the hook
  // will return true, which is how we know to fetch the next page of recipes
  const isScrolling = useInfiniteScroll(
    scrollTargetRef,
    disableScroll,
    bottomThresholdPercent
  );

  const handleGetRecipes = useCallback(() => {
    const recordCount = recipesResult?.data?.length ?? -1;
    const totalCount = recipesResult?.total ?? 0;

    setCount(recordCount);
    setTotal(totalCount);

    if (!isRecipesCallPending && recordCount < totalCount) {
      getRecipes();
    }
  }, [getRecipes, isRecipesCallPending, recipesResult?.data?.length, recipesResult?.total]);

  useEffect(() => {
    if (isScrolling) {
      // if the infinite scroll says we're scrolling,
      // then we retrieve the next page of recipes
      handleGetRecipes();
    }
  }, [handleGetRecipes, isScrolling]);

  return (
    <div>
      <div>
        <button
          onClick={() => {
            // here we demonstrate how we can turn
            // off the infinite scroll feature
            setDisableScroll((curr) => !curr);
          }}
        >
          {\`\${disableScroll ? 'ENABLE' : 'DISABLE'} infinite scroll\`}
        </button>
        <button
          onClick={() => {
            // here we demonstrate how we can change the bottom
            // threshold percentage, which determines when the
            // infinite scroll feature will kick in
            setBottomThresholdPercent((curr) => (curr === 10 ? 50 : 10));
          }}
        >
          {\`Change bottom threshold from \${bottomThresholdPercent}% to \${
            bottomThresholdPercent === 10 ? '50%' : '10%'
          }\`}
        </button>
        <button
          onClick={() => {
            // here we simply clear the data so we can start over
            clearRecipes();
            setTotal(0);
            setCount(0);
          }}
        />
          Reset Recipes
        </button>
        <h4>
          {count && total ? \`\${count === total ? \`All \${count}\` : \`\${count} of \${total}\`} recipes retrieved!\` : ''}
          {count && total && count < total ? ' (scroll recipe list to load more)' : ''}
        </h4>
      </div>
      <div style={{ height: '300px', overflowY: 'auto', padding: '1rem', width: '100%' }}>
        <ul>
          {recipesResult?.data?.map((recipe) => (
            <li key={recipe.id}>{\`\${recipe.name} (\${recipe.difficulty})\`}</li>
          ))}
        </ul>
        {isRecipesCallPending && <div>Loading recipes...</div>}
        <div ref={scrollTargetRef} />
      </div>
    </div>
  );
}`;
