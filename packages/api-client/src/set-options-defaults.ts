import { deepClone } from '../../utilities/src/data/deep-clone';
import { deepMerge } from '../../utilities/src/data/deep-merge';
import { EndpointOptionsDefaults, NormEndpointOptionsDefaults } from './types';

export const DEFFAULT_CACHE_CLEANUP_INTERVAL_SECONDS = 900;
export const DEFAULT_FREQUENCY_STRATEGY_TTL = 250;
export const DEFAULT_LOG_THROTTLE_WARNINGS_THRESHOLD = 10;
export const DEFAULT_RECORD_LIMIT = 100;
export const DEFAULT_RECORD_SKIP = 0;

export const __optionsDefaults: NormEndpointOptionsDefaults = {
  consoleOptions: {
    logThrottleCacheHits: false,
    logThrottleWarnings: true,
    logThrottleWarningsThreshold: DEFAULT_LOG_THROTTLE_WARNINGS_THRESHOLD,
  },
  frequencyOptions: {
    cacheCleanupIntervalSeconds: DEFFAULT_CACHE_CLEANUP_INTERVAL_SECONDS,
    frequencyStrategy: 'memory-cache',
    frequencyStrategyTTL: DEFAULT_FREQUENCY_STRATEGY_TTL,
  },
  interpolateUrlOptions: {
    addUnusedStateToQueryString: false,
    discardOrphanedQueryStringPlaceholders: false,
    preEncodeQueryStringValuesForKeys: [],
  },
  requestOptions: {
    autoCreateBodyFromState: true,
    errorOn404: false,
    formEncodingType: 'url',
    method: 'GET',
    mode: 'cors',
    pageToken: '',
    recordLimit: DEFAULT_RECORD_LIMIT,
    recordSkip: DEFAULT_RECORD_SKIP,
    requestType: 'json',
    responseType: 'json',
  },
  serverModelOptions: {
    jsonDataDotPath: '',
    jsonErrorDotPath: '',
    jsonNextPageTokenDotPath: 'nextPageToken',
    jsonPreviousPageTokenDotPath: 'previousPageToken',
    jsonTotalDotPath: 'total',
    pageTokenQueryParamName: 'pageToken',
    recordLimitQueryParamName: 'limit',
    recordSkipQueryParamName: 'skip',
  },
};

export let optionsDefaults = deepClone(__optionsDefaults);

// The resetOptionsDefaults is only used in tests
/* v8 ignore start */
export function resetOptionsDefaults() {
  optionsDefaults = deepClone(__optionsDefaults);
}
/* v8 ignore end */

/**
 * Override endpoint options defaults.
 */
export function setOptionsDefaults(defaults: EndpointOptionsDefaults) {
  optionsDefaults = deepMerge<NormEndpointOptionsDefaults>(__optionsDefaults, defaults);
}
