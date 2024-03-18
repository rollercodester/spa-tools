import { PiTreeStructureDuotone } from 'react-icons/pi';
import { DemoViewport, logTip } from 'showcase/widgets';
import { getUser, getUserTodos, updateUsername } from '../data-clients';

export function StateInterpolationTabPanel() {
  return (
    <DemoViewport
      code={code}
      ctaContent='Run State Interpolation Demo'
      ctaIcon={<PiTreeStructureDuotone fontSize='1.75rem' />}
      headingContent='Write super clean data clients that automatically translate model state into API request parameters and inputs.'
      initialOutputMessage='Click the "Run State Interpolation Demo" button to execute the demo...'
      language='ts'
      onClickCtaButton={async () => {
        logTip('Be sure to check your Network tab to inspect the API calls that were made');
        await getUserTodos({ userId: 3 });
        await getUserTodos({ completed: true, userId: 3 });
        await getUserTodos({ completed: false, userId: 3 });
        await getUser(5);
        await updateUsername(5, 'user5isAwesome');
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
import { ternary } from '@spa-tools/utilities';

// here the :userId endpoint path parameter will auto-interpolate from state
await getUserTodos({ userId: 3 });
// for the next two calls, all unused state will be auto-interpolated to the
// query string because the addUnusedStateToQueryString option has been enabled
await getUserTodos({ completed: true, userId: 3 });
await getUserTodos({ completed: false, userId: 3 });
// again, the :userId endpoint path parameter will auto-interpolate from state
await getUser(5);
// additionally, because the following executes a PATCH operation, the username
// state will be auto-interpolated to the request body
await updateUsername(5, 'user5isAwesome');

async function getUserTodos(criteria: { completed?: boolean; userId: number }) {
  const result = await callEndpoint(
    'https://jsonplaceholder.typicode.com/users/:userId/todos',
    { interpolateUrlOptions: { addUnusedStateToQueryString: true } },
    criteria
  );

  console.log(
    \`\${ternary(
      criteria.completed,
      'Completed t',
      'Pending t',
      'T'
    )}odos for user with ID "\${criteria.userId}":\`
  );
  console.log(result?.data);
}

async function getUser(userId: number) {
  const result = await callEndpoint('https://jsonplaceholder.typicode.com/users/:userId', { userId });

  console.log(\`User with ID "\${userId}":\`);
  console.log(result?.data);
}

async function updateUsername(userId: number, username: string) {
  const result = await callEndpoint(
    'https://jsonplaceholder.typicode.com/users/:userId',
    { requestOptions: { method: 'PATCH' } },
    { userId, username }
  );

  console.log(\`Updated username for user with ID "\${userId}":\`);
  console.log(result?.data);
}`;
