import { Text, VStack } from '@chakra-ui/react';
import { TbTransformFilled } from 'react-icons/tb';
import { DemoViewport, logTip } from 'showcase/widgets';
import { get500Error, getProductsByCategory, getRecipes } from '../data-clients';

export function ResultEnvelopeMappingTabPanel() {
  return (
    <DemoViewport
      code={code}
      ctaContent='Run Result Envelope Mapping Demo'
      ctaIcon={<TbTransformFilled fontSize='1.75rem' />}
      headingContent={
        <VStack sx={{ alignItems: 'flex-start', gap: '1rem' }}>
          <Text>
            Always keep your frontend result envelope standard and consistent even as backend response models vary
            drastically from endpoint to endpoint.
          </Text>
          <Text sx={{ fontWeight: 'normal' }}>
            The API Client is prescriptive about the client-side result envelope in that it always returns a{' '}
            <em>data</em> property for data and an <em>error</em> property for errors. This is a great pattern for
            frontend developers because it allows us to always expect the same result envelope regardless of the backend
            response model. We just determine what models to use respectively for each endpoint in a manner best suited
            for the frontend, which is an awesome use case for Typescript generics! Refer to the docsite to dive in more
            on this.
          </Text>
        </VStack>
      }
      initialOutputMessage='Click the "Run Result Envelope Mapping Demo" button to execute the demo...'
      language='ts'
      onClickCtaButton={async () => {
        logTip('Be sure to check your Network tab to inspect API calls that were made');
        await getProductsByCategory('groceries', 'products');
        await getProductsByCategory('laptops');
        await getRecipes();
        await get500Error();
      }}
    />
  );
}

//
//
// DISPLAY CODE
//
//

const code = `import { callEndpoint } from '@spa-tools/api-client';

// this call returns a result envelope where the data property is
// assigned by mapping to the backend object's "products" key
await getProductsByCategory('groceries', 'products');
// this call returns a result envelope where the data property has no
// mapping declared so that the backend "products" and all other response
// keys are retained as-is
await getProductsByCategory('laptops');
// like the first call, this returns a result envelope where the data
// property is assigned by mapping to the backend object's "recipes" key
await getRecipes();
// finally, this call responds with a 500 status and returns a result
// envelope where the error property is assigned by mapping to the
// backend object's "message" key
await get500Error();

async function getProductsByCategory(category: string, jsonDataDotPath?: string) {
  const result = await callEndpoint(
    'https://dummyjson.com/products/category/:category',
    { serverModelOptions: { jsonDataDotPath }},
    { category }
  );

  console.log(\`Products in "\${category}" category:\`);
  console.log(result?.data);
}

async function getRecipes(options: EndpointOptions) {
  const result = await callEndpoint(
    'https://dummyjson.com/recipes',
    { serverModelOptions: { jsonDataDotPath: 'recipes' }}
  );

  console.log('Recipes:');
  console.log(result?.data);
}

async function get500Error() {
  const result = await callEndpoint(
    'https://dummyjson.com/http/500/Example%20api%20error',
    { serverModelOptions: { jsonErrorDotPath: 'message' }}
  );

  console.error('500 error:', result?.error);
}`;
