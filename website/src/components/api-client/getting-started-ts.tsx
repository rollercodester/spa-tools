import CodeBlock from '@theme/CodeBlock';

export function ApiClientGettingStartedTsCode() {
  return (
    <CodeBlock language='ts'>
      {`import { callEndpoint } from '@spa-tools/api-client';

// define our data shape
export interface AlbumPhoto {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

// an engineer-friendly function to retrieve photos by album ID
export async function getAlbumPhotos(albumId: number) {
  //
  // the callEndpoint function is very similar to the fetch API but
  // with a variety of powerful features for request and response
  // (see Reference and Guides for more info).
  //
  // notice that we're specifying an array of AlbumPhoto objects
  // as the expected result data type which will give us very nice
  // intellisense when accessing the returned data; we could also
  // specify a custom error type as well if we wanted to
  const result = await callEndpoint<AlbumPhoto[]>(
    // we use an endpoint template here with a path param
    // which will auto-interpolate using the passed-in state
    'https://jsonplaceholder.typicode.com/albums/:albumId/photos',
    // this second argument contains the object we want to use to inject
    // state into the URL and as long as the state property names match
    // the path param names, they will auto-interpolate
    { albumId }
  );

  return result;
}

const albumId = 1;
const result = await getAlbumPhotos(albumId);

// the API Client calls always return a standardized result envelope
// that includes a data and an error property; while this structure
// cannot be changed, the interfaces of the underlying data and error
// types are 100% up to you and your API
if (result.data) {
  console.log(\`Photos for album with ID "\${albumId}":\`);
  console.log(result.data);
} else if (result.error) {
  console.error(\`Error retrieving photos for album with ID "\${albumId}":\`);
  console.error(result.error);
}`}
    </CodeBlock>
  );
}
