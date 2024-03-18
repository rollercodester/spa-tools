import { EndpointOptions } from '../types';
import { normalizeUrl } from './normalize-url';

describe('normalizeUrl', () => {
  it('should return the same URL for non-GET requests', () => {
    const options: EndpointOptions = {
      requestOptions: {
        method: 'POST',
        url: 'https://example.com/api',
      },
    };
    const result = normalizeUrl(options);
    expect(result).toEqual({ unmatchedParamState: {}, url: 'https://example.com/api' });
  });

  it('should add record limit and skip query parameters for GET requests', () => {
    const options: EndpointOptions = {
      requestOptions: { method: 'GET', recordLimit: 10, recordSkip: 5, url: 'https://example.com/api' },
      serverModelOptions: { recordLimitQueryParamName: 'limit', recordSkipQueryParamName: 'skip' },
    };
    const result = normalizeUrl(options);
    expect(result).toEqual({ unmatchedParamState: {}, url: 'https://example.com/api?limit=10&skip=5' });
  });

  it('should add pagination token query parameter for GET requests with JSON pagination', () => {
    const options: EndpointOptions = {
      requestOptions: {
        pageToken: 'abc123',
        method: 'GET',
        recordLimit: 10,
        requestType: 'json',
        url: 'https://example.com/api',
      },
      serverModelOptions: {
        pageTokenQueryParamName: 'pageToken',

        recordLimitQueryParamName: 'recordLimit',
      },
    };
    const result = normalizeUrl(options);
    expect(result).toEqual({ unmatchedParamState: {}, url: 'https://example.com/api?recordLimit=10&pageToken=abc123' });
  });

  it('should return the same URL for GET requests without record limit or pagination token', () => {
    const options: EndpointOptions = { requestOptions: { method: 'GET', url: 'https://example.com/api' } };
    const result = normalizeUrl(options);
    expect(result).toEqual({ unmatchedParamState: {}, url: 'https://example.com/api' });
  });

  it('should interpolate URL with provided state', () => {
    const options: EndpointOptions = {
      requestOptions: { method: 'GET', recordLimit: 10, url: 'https://example.com/users/:userId' },
      serverModelOptions: { recordLimitQueryParamName: 'limit' },
    };
    const result = normalizeUrl(options, { userId: '123' });
    expect(result).toEqual({ unmatchedParamState: {}, url: 'https://example.com/users/123?limit=10' });
  });

  it('should error if missing request url', () => {
    const options = { requestOptions: { method: 'GET' } };
    expect(() => normalizeUrl(options as EndpointOptions)).toThrowError();
  });

  it('should error if missing request options', () => {
    const options = {};
    expect(() => normalizeUrl(options as EndpointOptions)).toThrowError();
  });
});
