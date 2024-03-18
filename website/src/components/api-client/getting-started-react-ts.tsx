import CodeBlock from '@theme/CodeBlock';

export function ApiClientGettingStartedReactTsCode() {
  return (
    <CodeBlock language='tsx'>
      {`import { useCallEndpoint } from '@spa-tools/api-client';

// define our data shape
export interface AlbumPhoto {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

// an engineer-friendly hook to retrieve photos by album ID
function useGetAlbumPhotos() {
  //
  // hook wrappers are really this easy to create!
  //
  // notice that we're specifying an array of AlbumPhoto objects
  // as the expected result data type which will give us very nice
  // intellisense when accessing the returned data; we could also
  // specify a custom error type as well if we wanted to
  return useCallEndpoint<AlbumPhoto[]>('https://jsonplaceholder.typicode.com/albums/:albumId/photos');
}

function AlbumThumbnails({ albumId }: { albumId: number }) {
  const [getAlbumPhotos, albumPhotosResult, isAlbumPhotosCallPending, clearAlbumPhotos] = useGetAlbumPhotos();

  const handleRetrieveAlbumPhotos = () => {
    // trigger the API call
    getAlbumPhotos({ albumId });
  }

  return (
    <div>
      <div>
        <button onClick={handleRetrieveAlbumPhotos}>
          Retrieve Album Photos
        </button>
        <button onClick={clearAlbumPhotos}>
          Clear Album Photos
        </button>
      </div>
      <div>
        {isAlbumPhotosCallPending ? (
          <div>Loading album photos...</div>
        ) : albumPhotosResult?.data ? (
          <div>
            {albumPhotosResult.data.map((photo) => (
              <div key={photo.id}>
                <img src={photo.thumbnailUrl} alt={photo.title} />
              </div>
            ))}
          </div>
        ) : albumPhotosResult?.error ? (
          <div>Error: {albumPhotosResult.error}</div>
        ) : null}
      </div>
    </div>
  )
}
`}
    </CodeBlock>
  );
}
