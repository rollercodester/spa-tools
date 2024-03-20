<img alt="@spa-tools" height="150" src="../../apps/website/static/img/logo.svg?raw=true">
<div style='font-size: 2rem'>@spa-tools</div>

# API Client

<!-- Auto-generated Badges Start -->
<span class="badge-npmversion"><a href="https://npmjs.org/package/@spa-tools/api-client" title="View this project on NPM"><img src="https://img.shields.io/npm/v/@spa-tools/api-client.svg" alt="NPM version" /></a></span>
<span class="badge-githubworkflow"><a href="https://github.com/rollercodester/spa-tools/actions?query=workflow%3Atest-and-build-on-push.yml" title="View the status of this project's GitHub Workflow: test-and-build-on-push.yml"><img src="https://github.com/rollercodester/spa-tools/workflows/test-and-build-on-push.yml/badge.svg" alt="Status of the GitHub Workflow: test-and-build-on-push.yml" /></a></span>
<span class="badge-badge"><img src="./coverage-badge.svg" alt="Code Coverage" /></span>
<!-- Auto-generated Badges End -->

The `@spa-tools/api-client` package excels in calling HTTP API endpoints with features specifically designed
for modern, data-driven web applications. If your SPA has data workflows requiring calls to backend APIs
(public and/or private), then this tool may be just what the doctor ordered.

Feature highlights include:

- Throttling
- Caching
- State Interpolation
- Result Mapping
- React (or not)
- TypeScript First
- Zero Dependencies
- Tree-shakable

## Quickstart

#### It's highly advised to first checkout the [@spa-tools documentation site](https://rollercodester.github.io/spa-tools/) for a complete list of features, usage scenarios, guidance, and reference.

### Installation

`npm install @spa-tools/api-client`

### Usage

```ts
import { callEndpoint } from '@spa-tools/api-client';

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
  console.log(`Photos for album with ID "${albumId}":`);
  console.log(result.data);
} else if (result.error) {
  console.error(`Error retrieving photos for album with ID "${albumId}":`);
  console.error(result.error);
}
```

## Docsite

View the [@spa-tools documentation site](https://rollercodester.github.io/spa-tools/) for complete reference.


## Contributing

If you're interested in contributing to @spa-tools, please first create an issue on the [@spa-tools monorepo in GitHub](https://github.com/rollercodester/spa-tools)
or comment on an already open issue. From there we can discuss the feature or bugfix you're interested in and how best to approach it.
In terms of workflow, we use the standard approach of forking the repo, creating a PR, and merging after tesing/approval.

### Unit Test Coverage

All packages in @spa-tools require 100% unit test coverage. This is a condition for all PRs to be merged whether you're adding a new feature or fixing a bug.

The only exception is when native code is being wrapped and coverage is either not possible or redundant, which can be discussed on a case-by-case basis
during the approval process.

## License

All packages in @spa-tools are licensed under the [MIT](https://en.wikipedia.org/wiki/MIT_License) license. Copyright © 2024, Ryan Howard (rollercodester). All rights reserved.
