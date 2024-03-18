import { callEndpoint } from '@spa-tools/api-client';
import { logLabel } from 'showcase/widgets';

export async function getProductsByCategory(category: string, jsonDataDotPath?: string) {
  const result = await callEndpoint(
    'https://dummyjson.com/products/category/:category',
    { serverModelOptions: { jsonDataDotPath } },
    { category }
  );

  if (!result) {
    // this means call was throttled
    return;
  }

  logLabel(`Products in "${category}" category:`);
  console.log(result?.data);
}

export async function getRecipes() {
  const result = await callEndpoint('https://dummyjson.com/recipes', {
    serverModelOptions: { jsonDataDotPath: 'recipes' },
  });

  logLabel('Recipes:');
  console.log(result?.data);
}

export async function get500Error() {
  const result = await callEndpoint('https://dummyjson.com/http/500/Example api error', {
    serverModelOptions: { jsonErrorDotPath: 'message' },
  });

  console.error('500 error:', result?.error);
}
