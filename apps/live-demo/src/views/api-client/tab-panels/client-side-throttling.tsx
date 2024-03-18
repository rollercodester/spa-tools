import { GiRaceCar } from 'react-icons/gi';
import { DemoViewport, logTip } from 'showcase/widgets';
import { getAlbumPhotos } from '../data-clients';

export function ClientSideThrottlingTabPanel() {
  return (
    <DemoViewport
      code={code}
      ctaContent='Run Throttle Demo'
      ctaIcon={<GiRaceCar fontSize='3rem' />}
      headingContent={`Let's spice up a classic example of making a RESTful GET request while ensuring we don't make dupe calls using client-side throttling with a TTL.`}
      initialOutputMessage='Click the "Run Throttle Demo" button to execute the demo...'
      language='ts'
      onClickCtaButton={() => {
        logTip('Be sure to check your Network tab to see the that only (3) API calls were made');
        getAlbumPhotos(1, 'throttle');
        getAlbumPhotos(8, 'throttle');
        getAlbumPhotos(8, 'throttle');
        getAlbumPhotos(8, 'throttle');
        getAlbumPhotos(8, 'throttle');
        setTimeout(() => {
          getAlbumPhotos(8, 'throttle');
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

// first two calls are distinct and will be made to API endpoint
getAlbumPhotos(1);
getAlbumPhotos(8);
// following three calls will be throttled (no more calls will be made to the API endpoint)
getAlbumPhotos(8);
getAlbumPhotos(8);
// this call will cross the configured throttle warning threshold so a warning will be logged
getAlbumPhotos(8);

setTimeout(() => {
  // the throttle will reset after 300ms so this call will be made
  getAlbumPhotos(8);
}, 350);

async function getAlbumPhotos(albumId: number) {
  const result = await callEndpoint(
    'https://jsonplaceholder.typicode.com/albums/:albumId/photos',
    {
      consoleOptions: { logThrottleCacheHits: true, logThrottleWarningsThreshold: 3 },
      frequencyOptions: { frequencyStrategy: 'throttle', frequencyStrategyTTL: 300 },
    },
    { albumId }
  );

  if (!result) {
    // this means call was throttled
    return;
  }

  console.log(\`Photos for album with ID "\${albumId}":\`);
  console.log(result?.data);
}`;
