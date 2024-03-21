import CodeBlock from '@theme/CodeBlock';

export function ApiClientGettingStartedReactJsCode() {
  return (
    <CodeBlock language='tsx'>
      {`import { useCallEndpoint } from '@spa-tools/api-client';

// an engineer-friendly hook to retrieve photos by album ID
function useGetAlbumPhotos() {
  //
  // hook wrappers are really this easy to create!
  //
  return useCallEndpoint('https://jsonplaceholder.typicode.com/albums/:albumId/photos');
}

function AlbumThumbnails({ albumId }) {
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
