import { deepMerge } from '../../../utilities/src/data/deep-merge';
import {
  DEFAULT_FREQUENCY_STRATEGY_TTL,
  DEFAULT_LOG_THROTTLE_WARNINGS_THRESHOLD,
  DEFAULT_RECORD_LIMIT,
  DEFFAULT_CACHE_CLEANUP_INTERVAL_SECONDS,
  optionsDefaults,
} from '../set-options-defaults';
import { EndpointOptions, NormEndpointOptionsDefaults } from '../types';
import { isEndpointOptions } from './is-endpoint-options';

export function normalizeOptions<StateDataType = unknown>(
  urlOrOptions: string | EndpointOptions,
  optionsOrState?: EndpointOptions | StateDataType | boolean
) {
  let normOptions: EndpointOptions & NormEndpointOptionsDefaults = {} as EndpointOptions & NormEndpointOptionsDefaults;

  const isUrlOrOptionsActuallyOptions = isEndpointOptions<StateDataType>(urlOrOptions, optionsOrState as StateDataType);

  if (isUrlOrOptionsActuallyOptions) {
    normOptions = urlOrOptions as EndpointOptions & NormEndpointOptionsDefaults;
  } else if (isEndpointOptions<StateDataType>(optionsOrState as StateDataType)) {
    normOptions = optionsOrState as EndpointOptions & NormEndpointOptionsDefaults;
  }

  if (typeof urlOrOptions === 'string') {
    const urlRequestOptions: EndpointOptions = deepMerge(normOptions, {
      requestOptions: { url: urlOrOptions },
    });
    normOptions = normalizeOptions(urlRequestOptions);
  } else {
    normOptions = deepMerge<EndpointOptions & NormEndpointOptionsDefaults>(optionsDefaults, urlOrOptions);
  }

  normOptions.requestOptions.url = normOptions.requestOptions.url || '';

  if (
    normOptions.requestOptions.method !== 'GET' &&
    normOptions.frequencyOptions?.frequencyStrategy !== 'none' &&
    normOptions.frequencyOptions?.frequencyStrategy !== 'throttle'
  ) {
    normOptions.frequencyOptions.frequencyStrategy = 'throttle';
  }

  if (
    normOptions.frequencyOptions?.cacheCleanupIntervalSeconds &&
    normOptions.frequencyOptions.cacheCleanupIntervalSeconds < 15
  ) {
    console.error(
      `WARNING: cacheCleanupIntervalSeconds must be >= 15. Using default value of ${DEFFAULT_CACHE_CLEANUP_INTERVAL_SECONDS} instead.`
    );
    normOptions.frequencyOptions.cacheCleanupIntervalSeconds = DEFFAULT_CACHE_CLEANUP_INTERVAL_SECONDS;
  }

  if (normOptions.frequencyOptions?.frequencyStrategyTTL && normOptions.frequencyOptions.frequencyStrategyTTL < 1) {
    console.error(
      `WARNING: frequencyStrategyTTL must be greater than 0. Using default value of ${DEFAULT_FREQUENCY_STRATEGY_TTL} instead.`
    );
    normOptions.frequencyOptions.frequencyStrategyTTL = DEFAULT_FREQUENCY_STRATEGY_TTL;
  }

  if (
    normOptions.consoleOptions?.logThrottleWarningsThreshold &&
    normOptions.consoleOptions.logThrottleWarningsThreshold < 1
  ) {
    console.error(
      `WARNING: logThrottleWarningsThreshold must be greater than 0. Using default value of ${DEFAULT_LOG_THROTTLE_WARNINGS_THRESHOLD} instead.`
    );
    normOptions.consoleOptions.logThrottleWarningsThreshold = DEFAULT_LOG_THROTTLE_WARNINGS_THRESHOLD;
  }

  if (normOptions.requestOptions?.recordLimit && normOptions.requestOptions.recordLimit < 1) {
    console.error(
      `WARNING: recordLimit must be greater than 0. Using default value of ${DEFAULT_RECORD_LIMIT} instead.`
    );
    normOptions.requestOptions.recordLimit = DEFAULT_RECORD_LIMIT;
  }

  return normOptions;
}
