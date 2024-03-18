import { useEffect } from 'react';
import { Text } from '@chakra-ui/react';
import { useCallEndpoint } from '@spa-tools/api-client';
import { FaReact } from 'react-icons/fa';
import { DemoViewport, logLabel } from 'showcase/widgets';

function useGetAlbumPhotos() {
  return useCallEndpoint('https://jsonplaceholder.typicode.com/albums/:albumId/photos');
}

export function ReactHookTabPanel() {
  const [getAlbumPhotos, albumPhotosResult, isAlbumPhotosCallPending] = useGetAlbumPhotos();

  useEffect(() => {
    if (albumPhotosResult?.data) {
      logLabel('getAlbumPhotos call completed!');
      logLabel('Photos for album:');
      console.log(albumPhotosResult.data);
    } else if (albumPhotosResult?.error) {
      console.error('getAlbumPhotos call errored:');
      console.error(albumPhotosResult.error);
    } else if (isAlbumPhotosCallPending) {
      logLabel('getAlbumPhotos call in-progress');
    }
  }, [albumPhotosResult?.data, albumPhotosResult?.error, isAlbumPhotosCallPending]);

  return (
    <DemoViewport
      code={code}
      ctaContent='Run React Hook Demo'
      ctaIcon={<FaReact fontSize='1.75rem' />}
      ctaIsLoading={isAlbumPhotosCallPending}
      headingContent={
        <Text>
          If your SPA utilizes React then the <em>useCallEndpoint</em> hook will let you interact with your backend APIs
          with simplicity and ease and best of all, you&apos;ll never have to leave the comfort of your function
          component.
        </Text>
      }
      initialOutputMessage='Click the "Run React Hook Demo" button to execute the demo...'
      language='tsx'
      onClickCtaButton={() => {
        getAlbumPhotos({ albumId: 3 });
      }}
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

// creating endpoint-specific hook wrappers is really this easy!
function useGetAlbumPhotos() {
  return useCallEndpoint('https://jsonplaceholder.typicode.com/albums/:albumId/photos');
}

function ReactHookDemo() {
  const [getAlbumPhotos, albumPhotosResult, isAlbumPhotosCallPending] = useGetAlbumPhotos();

  useEffect(() => {
    if (albumPhotosResult?.data) {
      console.log('getAlbumPhotos call completed!');
      console.log('Photos for album:');
      console.log(albumPhotosResult.data);
    } else if (albumPhotosResult?.error) {
      console.error('getAlbumPhotos call errored:');
      console.error(albumPhotosResult.error);
    } else if (isAlbumPhotosCallPending) {
      console.log('getAlbumPhotos call in-progress');
    }
  }, [albumPhotosResult?.data, albumPhotosResult?.error, isAlbumPhotosCallPending]);

  return (
    <button
      onClickCtaButton={() => {
        getAlbumPhotos({ albumId: 3 });
      }}
    >
      Run React Hook Demo
    </button>
  )
}`;
