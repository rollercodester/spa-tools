/* eslint-disable no-case-declarations */
import type { InterpolateUrlResult } from '../../../utilities/src/urls/interpolate-url';
import { sleep } from '../../../utilities/src/execution-control/sleep';
import { optionsDefaults } from '../set-options-defaults';
import { EndpointOptions, EndpointResult, NormEndpointOptionsDefaults } from '../types';
import { getSessionCacheHitInfoLogMsg, memDataCache } from './common';

export function getMemCacheHitInfoLogMsg(normUrl: string) {
  return `INFO: The endpoint call to ${normUrl} was returned from memory cache.`;
}

export function getThrottleHitInfoLogMsg(normUrl: string, throttleLogCount: number) {
  return `INFO: The endpoint call to ${normUrl} was throttled ${throttleLogCount} time(s).`;
}

export function getThrottleHitWarningLogMsg(normUrl: string, throttleLogCount: number) {
  return `WARNING: The endpoint call to ${normUrl} has been throttled ${throttleLogCount} times. Please review your call logic for bugs, especially if being made within a React hook. This warning can be disabled by setting logThrottleWarningsThreshold to 0 in the options.`;
}

const throttleCountCache: Map<string, number> = new Map();

export async function handleRequest<ResultDataType = unknown, ResultErrorType = unknown>(
  frequencyStrategyKey: string,
  interpolationResult: InterpolateUrlResult,
  normOptions: EndpointOptions & NormEndpointOptionsDefaults
): Promise<HandledRequestResult<ResultDataType, ResultErrorType>> {
  //
  // memory cache logic
  //
  if (
    normOptions.frequencyOptions.frequencyStrategy === 'memory-cache' &&
    normOptions.requestOptions.method === 'GET' &&
    memDataCache.has(frequencyStrategyKey)
  ) {
    const memCachedData = memDataCache.get(frequencyStrategyKey)!;
    if (memCachedData.expiresAt > Date.now()) {
      if (normOptions.consoleOptions.logThrottleCacheHits) {
        console.log(getMemCacheHitInfoLogMsg(interpolationResult.url));
      }

      //
      // EARLY RETURN because of cache hit
      //
      {
        return {
          cachedResult: memCachedData.result as EndpointResult<ResultDataType, ResultErrorType>,
          needToCallFetch: false,
        };
      }
    }
  }
  //
  // session cache logic
  //
  if (
    normOptions.frequencyOptions.frequencyStrategy === 'session-cache' &&
    normOptions.requestOptions.method === 'GET'
  ) {
    const sessionCache = sessionStorage.getItem(frequencyStrategyKey);
    if (sessionCache) {
      const sessionCachedData = JSON.parse(sessionCache) as EndpointCacheModel<ResultDataType, ResultErrorType>;

      if (sessionCachedData.expiresAt > Date.now()) {
        if (normOptions.consoleOptions.logThrottleCacheHits) {
          console.log(getSessionCacheHitInfoLogMsg(interpolationResult.url));
        }

        //
        // EARLY RETURN because of cache hit
        //
        return {
          cachedResult: sessionCachedData.result as EndpointResult<ResultDataType, ResultErrorType>,
          needToCallFetch: false,
        };
      }
    }
  }
  //
  // throttle logic: note that this logic executes for all requests and not just GET
  // requests and also that throttle logic applies to both cache strategies as well
  //
  if (normOptions.frequencyOptions.frequencyStrategy !== 'none') {
    if (throttleCountCache.has(frequencyStrategyKey)) {
      const throttleCount = throttleCountCache.get(frequencyStrategyKey);

      if (throttleCount !== undefined) {
        const newCount = throttleCount + 1;
        throttleCountCache.set(frequencyStrategyKey, newCount);

        if (
          normOptions.consoleOptions.logThrottleWarningsThreshold &&
          normOptions.consoleOptions.logThrottleWarnings &&
          newCount >= normOptions.consoleOptions.logThrottleWarningsThreshold
        ) {
          console.error(getThrottleHitWarningLogMsg(interpolationResult.url, newCount));
        } else if (normOptions.consoleOptions.logThrottleCacheHits) {
          console.log(getThrottleHitInfoLogMsg(interpolationResult.url, newCount));
        }

        //
        // EARLY RETURN because call throttled
        //
        return {
          cachedResult: null,
          needToCallFetch: false,
        };
      }
    } else {
      throttleCountCache.set(frequencyStrategyKey, 0);
    }

    //
    // endpoint is about to be called so pause for TTL and then delete throttle count from cache
    //
    setTimeout(() => {
      throttleCountCache.delete(frequencyStrategyKey!);
    }, normOptions.frequencyOptions.frequencyStrategyTTL);

    // wait for the throttle TTL to pass
    await sleep(normOptions.frequencyOptions.frequencyStrategyTTL);

    return {
      cachedResult: null,
      needToCallFetch: true,
    };
  }

  return {
    cachedResult: null,
    needToCallFetch: true,
  };
}

export function clearThrottleCache() {
  throttleCountCache.clear();
}

//
//
// cache cleanup
//
//

// ignore code coverage for cache cleanup
/* v8 ignore start */

let cacheCleanupInterval: NodeJS.Timeout | null = null;

function cleanupCache() {
  // clear the cache cleanup interval so updated interval seconds from options can be used
  clearInterval(cacheCleanupInterval!);

  // clean up all expired memory-cache entries
  memDataCache.forEach((value, key) => {
    if (value.expiresAt < Date.now()) {
      memDataCache.delete(key);
    }
  });

  // clean up all expired session-cache entries (we iterate in reverse order because we are removing items from the session cache)
  for (let i = sessionStorage.length - 1; i >= 0; i--) {
    const key = sessionStorage.key(i)!;
    const sessionCachedData = JSON.parse(sessionStorage.getItem(key)!) as EndpointCacheModel<unknown, unknown>;

    if (sessionCachedData.expiresAt < Date.now()) {
      sessionStorage.removeItem(key);
    }
  }

  cacheCleanupInterval = setInterval(cleanupCache, optionsDefaults.frequencyOptions.cacheCleanupIntervalSeconds * 1000);
}

// trigger cleanup on load
cleanupCache();

/* v8 ignore end */

//
//
// local types
//
//

interface HandledRequestResult<ResultDataType, ResultErrorType> {
  cachedResult: EndpointResult<ResultDataType, ResultErrorType> | null;
  needToCallFetch: boolean;
}

interface EndpointCacheModel<ResultDataType, ResultErrorType> {
  expiresAt: number;
  result: EndpointResult<ResultDataType, ResultErrorType>;
}
