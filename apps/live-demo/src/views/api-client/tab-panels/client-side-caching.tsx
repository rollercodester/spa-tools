import { Text, VStack } from '@chakra-ui/react';
import { MdMemory } from 'react-icons/md';
import { DemoViewport, logTip } from 'showcase/widgets';
import { getAlbumPhotos } from '../data-clients';

export function ClientSideCachingTabPanel() {
  return (
    <DemoViewport
      code={code}
      ctaContent='Run Memory Cache Demo'
      ctaIcon={<MdMemory fontSize='2rem' />}
      headingContent={
        <VStack sx={{ alignItems: 'flex-start', gap: '1rem' }}>
          <Text>
            Client-side caching enables us to share API data across multiple views/components without the hassle of a
            central store, pub/sub tooling, app context, or any ugly reducer boilerplate.
          </Text>
          <Text sx={{ fontWeight: 'normal' }}>
            <strong>GTK:</strong> This demo uses &quot;memory-cache&quot; but a &quot;session-cache&quot; (i.e.{' '}
            <em>sessionStorage</em>) option is also available.
          </Text>
        </VStack>
      }
      initialOutputMessage='Click the "Run Memory Cache Demo" button to execute the demo...'
      language='ts'
      onClickCtaButton={async () => {
        logTip(
          'Be sure to check your Network tab to see the that only (3) API calls\n  were made while (6) result sets were returned and logged in the console'
        );
        await getAlbumPhotos(4, 'memory-cache');
        await getAlbumPhotos(5, 'memory-cache');
        await getAlbumPhotos(5, 'memory-cache');
        await getAlbumPhotos(5, 'memory-cache');
        await getAlbumPhotos(5, 'memory-cache');
        setTimeout(async () => {
          await getAlbumPhotos(5, 'memory-cache');
        }, 350);
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

// first (2) calls are distinct and will be made to API endpoint
await getAlbumPhotos(4);
await getAlbumPhotos(5);
// following (3) calls will be cached -- no more calls will be made
// to the API endpoint AND cached data will be returned
await getAlbumPhotos(5);
await getAlbumPhotos(5);
await getAlbumPhotos(5);

setTimeout(async () => {
  // cache will expire after 300ms so this call will be made
  await getAlbumPhotos(5);
}, 350);

async function getAlbumPhotos(albumId: number) {
  const result = await callEndpoint(
    'https://jsonplaceholder.typicode.com/albums/:albumId/photos',
    {
      consoleOptions: { logThrottleCacheHits: true, logThrottleWarningsThreshold: 3 },
      frequencyOptions: { frequencyStrategy: 'memory-cache', frequencyStrategyTTL: 300 },
    },
    { albumId }
  );

  console.log(\`Photos for album with ID "\${albumId}":\`);
  console.log(result?.data);
}`;
