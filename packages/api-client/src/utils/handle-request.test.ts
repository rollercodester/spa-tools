import { EndpointOptions } from '../types';
import { getSessionCacheHitInfoLogMsg } from './common';
import {
  clearThrottleCache,
  getMemCacheHitInfoLogMsg,
  getThrottleHitInfoLogMsg,
  getThrottleHitWarningLogMsg,
  handleRequest,
} from './handle-request';
import { handleResponse } from './handle-response';
import { normalizeOptions } from './normalize-options';

const frequencyStrategyKey = 'test-key';
const url = 'https://example.com';

describe('frequency-strategy', () => {
  const consoleLogSpy = vi.spyOn(console, 'log');
  const consoleErrorSpy = vi.spyOn(console, 'error');

  consoleLogSpy.mockImplementation(() => null);
  consoleErrorSpy.mockImplementation(() => null);

  afterEach(() => {
    consoleLogSpy.mockClear();
    consoleErrorSpy.mockClear();
  });

  describe('handleRequest', () => {
    describe('for memory-cache strategy', () => {
      const memCacheOpts: EndpointOptions = {
        frequencyOptions: {
          frequencyStrategy: 'memory-cache',
        },
        requestOptions: {
          method: 'GET',
          url,
        },
        serverModelOptions: {
          jsonDataDotPath: 'data',
        },
      };

      const data = { data: 'mem-cached data' };
      const response = get200Response(data);

      it('should return cached result when cache hits', async () => {
        // this will cause the response to be cached
        await normHandleResponse(response, memCacheOpts);

        const result = await normHandleRequest(memCacheOpts);

        expect(result).toEqual({
          cachedResult: data,
          needToCallFetch: false,
        });
      });

      it('should return null cached result and set flag to call fetch when cache has expired', async () => {
        // this will cause the response to be cached
        await normHandleResponse(response, memCacheOpts);

        // this will cause the cache to expire
        await new Promise((resolve) => setTimeout(resolve, 300));

        const result = await normHandleRequest(memCacheOpts);

        expect(result).toEqual({
          cachedResult: null,
          needToCallFetch: true,
        });
      });

      it('should console log or not (as configured) when cache hits', async () => {
        const opts: EndpointOptions = { ...memCacheOpts, consoleOptions: { logThrottleCacheHits: true } };

        // this will cause the response to be cached
        await normHandleResponse(response, opts);

        // this will cause a console log
        await normHandleRequest(opts);

        // should not cause a console log
        await normHandleRequest({ ...opts, consoleOptions: { ...opts.consoleOptions, logThrottleCacheHits: false } });

        expect(console.log).toHaveBeenCalledWith(getMemCacheHitInfoLogMsg(url));
        expect(console.log).toHaveBeenCalledTimes(1);
      });
    });

    describe('for session-cache strategy', () => {
      const sessionCacheOpts: EndpointOptions = {
        frequencyOptions: {
          frequencyStrategy: 'session-cache',
        },
        requestOptions: {
          method: 'GET',
          url,
        },
        serverModelOptions: {
          jsonDataDotPath: 'data',
        },
      };
      const data = { data: 'session-cached data' };
      const response = get200Response(data);

      it('should return cached result when cache hits', async () => {
        // this will cause the response to be cached
        await normHandleResponse(response, sessionCacheOpts);

        const result = await normHandleRequest(sessionCacheOpts);

        expect(result).toEqual({
          cachedResult: data,
          needToCallFetch: false,
        });
      });

      it('should return null cached result and set flag to call fetch when cache has expired', async () => {
        // this will cause the response to be cached
        await normHandleResponse(response, sessionCacheOpts);

        // this will cause the cache to expire
        await new Promise((resolve) => setTimeout(resolve, 300));

        const result = await normHandleRequest(sessionCacheOpts);

        expect(result).toEqual({
          cachedResult: null,
          needToCallFetch: true,
        });
      });

      it('should console log or not (as configured) when cache hits', async () => {
        const opts: EndpointOptions = { ...sessionCacheOpts, consoleOptions: { logThrottleCacheHits: true } };

        // this will cause the request to be cached
        await normHandleResponse(response, opts);

        // this will cause a console log
        await normHandleRequest(opts);

        // should not cause a console log
        await normHandleRequest({ ...opts, consoleOptions: { ...opts.consoleOptions, logThrottleCacheHits: false } });

        expect(console.log).toHaveBeenCalledWith(getSessionCacheHitInfoLogMsg(url));
        expect(console.log).toHaveBeenCalledTimes(1);
      });
    });

    describe('for throttle strategy', () => {
      const throttleOpts: EndpointOptions = {
        frequencyOptions: {
          frequencyStrategy: 'throttle',
          frequencyStrategyTTL: 500,
        },
        requestOptions: {
          method: 'GET',
          url,
        },
      };

      it('should return null cached result and not require fetch to be called when call is throttled', async () => {
        // this will cause the second call to be throttled
        const firstCall = normHandleRequest(throttleOpts);
        const secondCall = normHandleRequest(throttleOpts);

        const firstResult = await firstCall;

        expect(firstResult).toEqual({
          cachedResult: null,
          needToCallFetch: true,
        });

        const secondResult = await secondCall;

        expect(secondResult).toEqual({
          cachedResult: null,
          needToCallFetch: false,
        });
      });

      it('should console log or not (as configured) when call is throttled', () => {
        const opts: EndpointOptions = { ...throttleOpts, consoleOptions: { logThrottleCacheHits: true } };

        clearThrottleCache();

        // this will cause the next request to be throttled
        normHandleRequest(opts);

        // this will cause a console log
        normHandleRequest(opts);

        expect(console.log).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledWith(getThrottleHitInfoLogMsg(url, 1));

        consoleLogSpy.mockClear();

        // turn off logging of cache hits
        normHandleRequest({ ...opts, consoleOptions: { ...opts.consoleOptions, logThrottleCacheHits: false } });
        expect(console.log).toHaveBeenCalledTimes(0);
      });

      it('should console error or not (as configured) when call is throttled more than configured threshold', () => {
        const opts: EndpointOptions = {
          ...throttleOpts,
          consoleOptions: { logThrottleCacheHits: false, logThrottleWarnings: true, logThrottleWarningsThreshold: 2 },
        };

        clearThrottleCache();

        normHandleRequest(opts);
        normHandleRequest(opts);

        // this should cause the request to log a warning
        normHandleRequest(opts);

        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith(getThrottleHitWarningLogMsg(url, 2));

        consoleErrorSpy.mockClear();

        // turn off logging of throttle warnings
        normHandleRequest({ ...opts, consoleOptions: { ...opts.consoleOptions, logThrottleWarnings: false } });
        expect(console.error).toHaveBeenCalledTimes(0);
      });

      it('should delete throttle cache once configured TTL has elapsed', async () => {
        await normHandleRequest(throttleOpts);
        const secondResult = await normHandleRequest(throttleOpts);

        expect(secondResult).toEqual({
          cachedResult: null,
          needToCallFetch: false,
        });

        const normOptions = getNormOptions(throttleOpts);

        // this will cause the cache to expire
        await new Promise((resolve) => setTimeout(resolve, normOptions.frequencyOptions.frequencyStrategyTTL));

        const thirdResult = await normHandleRequest(throttleOpts);

        expect(thirdResult).toEqual({
          cachedResult: null,
          needToCallFetch: true,
        });
      });
    });

    describe('for none strategy', () => {
      it('should return null cached result and require fetch to be called when frequency strategy is none', async () => {
        const opts: EndpointOptions = {
          frequencyOptions: {
            frequencyStrategy: 'none',
          },
          requestOptions: {
            method: 'GET',
            url,
          },
        };

        const result = await normHandleRequest(opts);

        expect(result).toEqual({
          cachedResult: null,
          needToCallFetch: true,
        });
      });
    });
  });
});

//
//
// helpers
//
//

function get200Response(data: Record<string, unknown>) {
  const resp = new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
    },
    status: 200,
    statusText: 'OK',
  });

  return resp;
}

function getNormOptions(options: EndpointOptions) {
  return normalizeOptions({
    ...{
      requestOptions: {
        method: 'GET',
        url,
      },
    },
    ...options,
  });
}

function normHandleRequest(options: EndpointOptions) {
  return handleRequest(frequencyStrategyKey, { unmatchedParamState: {}, url }, getNormOptions(options));
}

function normHandleResponse(response: Response, options: EndpointOptions) {
  return handleResponse(response, frequencyStrategyKey, getNormOptions(options));
}
