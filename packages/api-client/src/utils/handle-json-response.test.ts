import { setOptionsDefaults } from '../set-options-defaults';
import { handleJsonResponse } from './handle-json-response';

describe('handleJsonResponse', () => {
  afterEach(() => {
    // Reset optionsDefaults to its original state after each test
    setOptionsDefaults({});
  });

  it('should handle a response with valid JSON data', async () => {
    const jsonDataDotPath = 'data';
    const jsonNextPageTokenDotPath = 'nextPageTokenX';
    const jsonPreviousPageTokenDotPath = 'previousPageTokenX';
    const jsonTotalDotPath = 'totalX';

    const response = new Response(
      JSON.stringify({
        data: {
          id: 1,
          name: 'John Doe',
        },
        nextPageTokenX: 'abc123',
        previousPageTokenX: 'xyz789',
        totalX: 100,
      })
    );

    const result = await handleJsonResponse({
      jsonDataDotPath,
      jsonNextPageTokenDotPath,
      jsonPreviousPageTokenDotPath,
      jsonTotalDotPath,
      response,
    });

    expect(result).toEqual({
      data: {
        id: 1,
        name: 'John Doe',
      },
      nextPageToken: 'abc123',
      previousPageToken: 'xyz789',
      total: 100,
    });
  });

  it('should handle a response with flat JSON data', async () => {
    const jsonDataDotPath = '';
    const jsonNextPageTokenDotPath = '';
    const jsonPreviousPageTokenDotPath = '';
    const jsonTotalDotPath = '';

    const response = new Response(
      JSON.stringify({
        id: 1,
        name: 'John Doe',
      })
    );

    const result = await handleJsonResponse({
      jsonDataDotPath,
      jsonNextPageTokenDotPath,
      jsonPreviousPageTokenDotPath,
      jsonTotalDotPath,
      response,
    });

    expect(result).toEqual({
      data: {
        id: 1,
        name: 'John Doe',
      },
    });
  });

  it('should handle a response with valid JSON data while using paginatation dot path defaults', async () => {
    const jsonDataDotPath = 'data';

    const response = new Response(
      JSON.stringify({
        data: {
          id: 1,
          name: 'John Doe',
        },
        nextPageToken: 'abc123',
        previousPageToken: 'xyz789',
      })
    );

    const result = await handleJsonResponse({
      jsonDataDotPath,
      response,
    });

    expect(result).toEqual({
      data: {
        id: 1,
        name: 'John Doe',
      },
      nextPageToken: 'abc123',
      previousPageToken: 'xyz789',
    });
  });

  it('should use optionsDefaults', async () => {
    setOptionsDefaults({
      serverModelOptions: {
        jsonDataDotPath: 'data.nested',
      },
    });

    const response = new Response(
      JSON.stringify({
        data: {
          nested: {
            id: 1,
            name: 'John Doe',
          },
        },
        nextPageToken: 'abc123',
        previousPageToken: 'xyz789',
      })
    );

    const result = await handleJsonResponse({
      response,
    });

    expect(result).toEqual({
      data: {
        id: 1,
        name: 'John Doe',
      },
      nextPageToken: 'abc123',
      previousPageToken: 'xyz789',
    });
  });

  it('should handle a response with an error', async () => {
    const jsonErrorDotPath = 'error';

    const response = new Response(
      JSON.stringify({
        error: 'Invalid request',
      })
    );

    const result = await handleJsonResponse({
      jsonErrorDotPath,
      response,
    });

    expect(result).toEqual({
      error: 'Invalid request',
    });
  });

  it('should handle a response with invalid JSON', async () => {
    const jsonDataDotPath = 'data';
    const jsonErrorDotPath = 'error';
    const jsonNextPageTokenDotPath = 'nextPageToken';
    const jsonPreviousPageTokenDotPath = 'previousPageToken';
    const jsonTotalDotPath = 'total';

    const response = new Response('Invalid JSON');

    const result = await handleJsonResponse({
      jsonDataDotPath,
      jsonErrorDotPath,
      jsonNextPageTokenDotPath,
      jsonPreviousPageTokenDotPath,
      jsonTotalDotPath,
      response,
    });

    expect(result).toEqual({
      error: 'The response returned invalid JSON',
    });
  });

  it('should handle a response with status 404', async () => {
    const response = new Response('', { status: 404 });

    const result = await handleJsonResponse({
      response,
    });

    expect(result).toBeNull();
  });
});
