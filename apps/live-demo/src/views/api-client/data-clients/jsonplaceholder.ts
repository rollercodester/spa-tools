import { callEndpoint } from '@spa-tools/api-client';
import { tern } from '@spa-tools/utilities';
import { logLabel } from 'showcase/widgets';

export async function getUser(userId: number) {
  const result = await callEndpoint('https://jsonplaceholder.typicode.com/users/:userId', { userId });

  logLabel(`User with ID "${userId}":`);
  console.log(result?.data);
}

export async function updateUsername(userId: number, username: string) {
  const result = await callEndpoint(
    'https://jsonplaceholder.typicode.com/users/:userId',
    { requestOptions: { method: 'PATCH' } },
    { userId, username }
  );

  logLabel(`Updated username for user with ID "${userId}":`);
  console.log(result?.data);
}

export async function getUserTodos(criteria: { completed?: boolean; userId: number }) {
  const result = await callEndpoint(
    'https://jsonplaceholder.typicode.com/users/:userId/todos',
    { interpolateUrlOptions: { addUnusedStateToQueryString: true } },
    criteria
  );

  logLabel(`${tern(criteria.completed, 'Completed t', 'Pending t', 'T')}odos for user with ID "${criteria.userId}":`);
  console.log(result?.data);
}

export async function getPostComments(postId: number) {
  const result = await callEndpoint('https://jsonplaceholder.typicode.com/posts/:postId/comments', { postId });

  logLabel(`Comments for post with ID "${postId}":`);
  console.log(result?.data);
}

export async function getUserAlbums(userId: number) {
  const result = await callEndpoint(
    'https://jsonplaceholder.typicode.com/albums',
    { interpolateUrlOptions: { addUnusedStateToQueryString: true } },
    { userId }
  );

  logLabel(`Albums for user with ID "${userId}":`);
  console.log(result?.data);
}

export async function getAlbumPhotos(albumId: number, frequencyStrategy?: 'memory-cache' | 'throttle') {
  const result = await callEndpoint(
    'https://jsonplaceholder.typicode.com/albums/:albumId/photos',
    {
      consoleOptions: { logThrottleCacheHits: true, logThrottleWarningsThreshold: 3 },
      frequencyOptions: { frequencyStrategy, frequencyStrategyTTL: 300 },
    },
    { albumId }
  );

  if (frequencyStrategy === 'throttle' && !result) {
    // this means call was throttled
    return;
  }

  logLabel(`Photos for album with ID "${albumId}":`);
  console.log(result?.data);
}
