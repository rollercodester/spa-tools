import { useCallback, useEffect } from 'react';
import { Text, VStack } from '@chakra-ui/react';
import { useCallEndpoint } from '@spa-tools/api-client';
import { SiCreatereactapp } from 'react-icons/si';
import { DemoViewport, logLabel, logTip } from 'showcase/widgets';

const RECIPE_RECORD_LIMIT = 10;

function useGetRecipes() {
  return useCallEndpoint<Record<string, unknown>[]>(
    'https://dummyjson.com/recipes',
    {
      requestOptions: { recordLimit: RECIPE_RECORD_LIMIT },
      serverModelOptions: { jsonDataDotPath: 'recipes', recordSkipQueryParamName: 'skip' },
    },
    true
  );
}

export function ReactHookAppendTabPanel() {
  const [getRecipes, recipesResult, isRecipesCallPending, clearRecipes] = useGetRecipes();

  const handleGetRecipes = useCallback(async () => {
    if (!recipesResult?.data) {
      logTip('Be sure to check your Network tab to see the that (5) paginated API calls were made');
    }

    const recordCount = recipesResult?.data?.length ?? -1;
    const totalCount = recipesResult?.total ?? 0;

    if (recordCount < totalCount) {
      getRecipes();
    } else {
      // demo is done so clear out the recipes
      await clearRecipes();
    }
  }, [clearRecipes, getRecipes, recipesResult]);

  useEffect(() => {
    const callNum = recipesResult && recipesResult.data ? recipesResult.data.length / RECIPE_RECORD_LIMIT : 0;

    if (recipesResult?.data && !isRecipesCallPending) {
      logLabel(`getRecipes call #${callNum} completed!`);
      console.log(recipesResult.data);
      handleGetRecipes();
    } else if (recipesResult?.error) {
      console.error(`getRecipes call #${callNum} errored:`);
      console.error(recipesResult.error);
    } else if (isRecipesCallPending) {
      logLabel(`getRecipes call #${callNum + 1} in-progress`);
    }
  }, [handleGetRecipes, isRecipesCallPending, recipesResult]);

  return (
    <DemoViewport
      code={code}
      ctaContent='Run Append Data Demo'
      ctaIcon={<SiCreatereactapp fontSize='1.75rem' />}
      ctaIsLoading={isRecipesCallPending}
      headingContent={
        <VStack sx={{ alignItems: 'flex-start', gap: '1rem' }}>
          <Text>
            The useCallEndpoint hook&apos;s <em>&quot;append&quot;</em> option makes implementing patterns like infinite
            scroll a snap by auto-appending paginated data to the result.
          </Text>
          <Text sx={{ fontWeight: 'normal' }}>
            The API endpoint called in this example uses <em>skip</em> and <em>total</em> pagination fields along with{' '}
            <em>limit</em> but endpoints that use pagination tokens like <em>nextPageToken</em> and{' '}
            <em>previousPageToken</em> are also supported. The actual pagination property names are of course 100%
            configurable by endpoint.
          </Text>
        </VStack>
      }
      initialOutputMessage='Click the "Run Append Data Demo" button to execute the demo...'
      language='tsx'
      onClickCtaButton={handleGetRecipes}
    />
  );
}

//
//
// DISPLAY CODE
//
//

const code = `import { useCallback, useEffect } from 'react';
import { useCallEndpoint } from '@spa-tools/api-client';

const RECIPE_RECORD_LIMIT = 10;

// this is a simple hook wrapper making it specific to the "recipes" endpoint
function useGetRecipes() {
  return useCallEndpoint<Record<string, unknown>[]>(
    'https://dummyjson.com/recipes',
    {
      requestOptions: { recordLimit: RECIPE_RECORD_LIMIT },
      serverModelOptions: { jsonDataDotPath: 'recipes' },
    },
    // passing in true here tells the hook to append
    // all successive paginated data to the result
    true
  );
}

function ReactHookAppendDemo() {
  const [getRecipes, recipesResult, isRecipesCallPending, clearRecipes] = useGetRecipes();

  const handleGetRecipes = useCallback(async () => {
    const recordCount = recipesResult?.data?.length ?? -1;
    const totalCount = recipesResult?.total ?? 0;

    if (recordCount < totalCount) {
      getRecipes();
    } else {
      // demo is done so clear out the recipes
      await clearRecipes();
    }
  }, [clearRecipes, getRecipes, recipesResult]);

  useEffect(() => {
    const callNum = recipesResult && recipesResult.data
      ? recipesResult.data.length / RECIPE_RECORD_LIMIT
      : 0;

    if (recipesResult?.data && !isRecipesCallPending) {
      console.log(\`getRecipes call #\${callNum} completed!\`);
      console.log(recipesResult.data);
      // trigger check for next batch of recipes
      handleGetRecipes();
    } else if (recipesResult?.error) {
      console.error(\`getRecipes call #\${callNum} errored:\`);
      console.error(recipesResult.error);
    } else if (isRecipesCallPending) {
      console.log(\`getRecipes call #\${callNum + 1} in-progress\`);
    }
  }, [handleGetRecipes, isRecipesCallPending, recipesResult]);

  return (
    <button onClick={handleGetRecipes}>Run Append Data Demo</button>
  )
}`;
