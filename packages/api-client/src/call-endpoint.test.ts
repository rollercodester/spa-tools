import { callEndpoint } from './call-endpoint';
import { EndpointOptions } from './types';
import * as utils from './utils';

describe('callEndpoint', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should handle a successful GET request with JSON response', async () => {
    const options: EndpointOptions = {
      requestOptions: {
        method: 'GET',
        responseType: 'json',
        url: 'https://api.example.com/data',
      },
      serverModelOptions: {
        jsonDataDotPath: 'data',
      },
    };

    const response = new Response(
      JSON.stringify({
        data: {
          id: 1,
          name: 'John Doe',
        },
      })
    );

    const handleRequestSpy = vi.spyOn(utils, 'handleRequest');

    handleRequestSpy.mockResolvedValue({
      cachedResult: null,
      needToCallFetch: true,
    });

    vi.spyOn(global, 'fetch').mockResolvedValue(response);

    const result = await callEndpoint(options);

    expect(result).toEqual({
      data: {
        id: 1,
        name: 'John Doe',
      },
    });
  });

  it('should handle no request options being passed', async () => {
    const response = new Response(
      JSON.stringify({
        id: 1,
        name: 'John Doe',
      })
    );

    const handleRequestSpy = vi.spyOn(utils, 'handleRequest');

    handleRequestSpy.mockResolvedValue({
      cachedResult: null,
      needToCallFetch: true,
    });

    vi.spyOn(global, 'fetch').mockResolvedValue(response);

    const result = await callEndpoint('https://api.example.com/data');

    expect(result).toEqual({
      data: {
        id: 1,
        name: 'John Doe',
      },
    });
  });

  it('should handle a successful POST request with auto-interpolated state', async () => {
    const options: EndpointOptions = {
      requestOptions: {
        method: 'POST',
        responseType: 'json',
        url: 'https://api.example.com/data',
      },
      serverModelOptions: {
        jsonDataDotPath: 'data',
      },
    };

    const response = new Response(
      JSON.stringify({
        data: {
          id: 1,
          name: 'John Doe',
        },
      })
    );

    const handleRequestSpy = vi.spyOn(utils, 'handleRequest');

    handleRequestSpy.mockResolvedValue({
      cachedResult: null,
      needToCallFetch: true,
    });

    vi.spyOn(global, 'fetch').mockResolvedValue(response);

    const result = await callEndpoint(options, { id: 1, name: 'John Doe' });

    expect(result).toEqual({
      data: {
        id: 1,
        name: 'John Doe',
      },
    });
  });

  it('should handle a successful POST request with auto-interpolated state and url string passed in', async () => {
    const options: EndpointOptions = {
      requestOptions: {
        method: 'POST',
        responseType: 'json',
      },
      serverModelOptions: {
        jsonDataDotPath: 'data',
      },
    };

    const response = new Response(
      JSON.stringify({
        data: {
          id: 1,
          name: 'John Doe',
        },
      })
    );

    const handleRequestSpy = vi.spyOn(utils, 'handleRequest');

    handleRequestSpy.mockResolvedValue({
      cachedResult: null,
      needToCallFetch: true,
    });

    vi.spyOn(global, 'fetch').mockResolvedValue(response);

    const result = await callEndpoint('https://api.example.com/data', options, { id: 1, name: 'John Doe' });

    expect(result).toEqual({
      data: {
        id: 1,
        name: 'John Doe',
      },
    });
  });

  it('should handle a successful POST request url string passed in', async () => {
    const options: EndpointOptions = {
      requestOptions: {
        method: 'POST',
        responseType: 'json',
      },
      serverModelOptions: {
        jsonDataDotPath: 'data',
      },
    };

    const response = new Response(
      JSON.stringify({
        data: {
          id: 1,
          name: 'John Doe',
        },
      })
    );

    const handleRequestSpy = vi.spyOn(utils, 'handleRequest');

    handleRequestSpy.mockResolvedValue({
      cachedResult: null,
      needToCallFetch: true,
    });

    vi.spyOn(global, 'fetch').mockResolvedValue(response);

    const result = await callEndpoint('https://api.example.com/data', options);

    expect(result).toEqual({
      data: {
        id: 1,
        name: 'John Doe',
      },
    });
  });

  it('should handle a void 200 request that does not need a fetch call', async () => {
    const options: EndpointOptions = {
      requestOptions: {
        errorOn404: false,
        method: 'GET',
        responseType: 'void',
        url: 'https://api.example.com/data',
      },
    };

    const response = new Response('', { status: 200, statusText: 'OK' });

    vi.spyOn(utils, 'handleRequest').mockResolvedValue({
      cachedResult: null,
      needToCallFetch: false,
    });

    vi.spyOn(global, 'fetch').mockResolvedValue(response);

    const result = await callEndpoint(options);

    expect(result).toEqual(null);
  });
});
