import { deepMerge } from '../../../utilities/src/data/deep-merge';
import {
  DEFAULT_FREQUENCY_STRATEGY_TTL,
  DEFAULT_LOG_THROTTLE_WARNINGS_THRESHOLD,
  DEFAULT_RECORD_LIMIT,
  DEFFAULT_CACHE_CLEANUP_INTERVAL_SECONDS,
  __optionsDefaults,
  resetOptionsDefaults,
  setOptionsDefaults,
} from '../set-options-defaults';
import { EndpointOptions } from '../types';
import { normalizeOptions } from './normalize-options';

describe('normalizeOptions', () => {
  afterEach(() => {
    resetOptionsDefaults();
  });

  it('should normalize options with default values', () => {
    const options: EndpointOptions = {
      requestOptions: {
        url: 'https://example.com',
      },
    };
    const expectedOptions = deepMerge<EndpointOptions>(__optionsDefaults, options);
    const normalizedOptions = normalizeOptions(options);
    expect(normalizedOptions).toEqual(expectedOptions);
  });

  it('should normalize options with default values when URL is first param', () => {
    const options = {
      requestOptions: {
        method: 'PUT',
      },
    } as EndpointOptions;
    const urlOptions = deepMerge(options, { requestOptions: { url: 'https://example.com' } });
    const normDefault = deepMerge<EndpointOptions>(__optionsDefaults, {
      frequencyOptions: { frequencyStrategy: 'throttle' },
    });
    const expectedOptions = deepMerge<EndpointOptions>(normDefault, urlOptions);
    const normalizedOptions = normalizeOptions('https://example.com', options);
    expect(normalizedOptions).toEqual(expectedOptions);
  });

  it('should normalize options with default values when URL is first param and no method provided', () => {
    const options = {
      serverModelOptions: {
        jsonDataDotPath: 'customData',
      },
    } as EndpointOptions;
    const urlOptions = deepMerge(options, { requestOptions: { url: 'https://example.com' } });
    const expectedOptions = deepMerge<EndpointOptions>(__optionsDefaults, urlOptions);
    const normalizedOptions = normalizeOptions('https://example.com', options);
    expect(normalizedOptions).toEqual(expectedOptions);
  });

  it('should normalize options with default values when URL is first param and state with no options provided', () => {
    const expectedOptions = deepMerge<EndpointOptions>(__optionsDefaults, {
      requestOptions: { url: 'https://example.com' },
    });
    const normalizedOptions = normalizeOptions('https://example.com', { firstName: 'John', lastName: 'Doe' });
    expect(normalizedOptions).toEqual(expectedOptions);
  });

  it('should override default values with provided options', () => {
    setOptionsDefaults({
      requestOptions: {
        method: 'POST',
        recordLimit: 50,
        responseType: 'text',
      },
    });

    const options: EndpointOptions = {
      requestOptions: {
        url: 'https://example.com',
      },
    };
    const expectedOptions = deepMerge<EndpointOptions>(deepMerge(__optionsDefaults, options), {
      requestOptions: { method: 'POST', recordLimit: 50, responseType: 'text' },
    });
    const normalizedOptions = normalizeOptions(options);
    expect(normalizedOptions).toEqual(expectedOptions);
  });

  it('should override invalid default values', () => {
    setOptionsDefaults({
      consoleOptions: {
        logThrottleWarningsThreshold: -1,
      },
      frequencyOptions: {
        cacheCleanupIntervalSeconds: -1,
        frequencyStrategyTTL: -1,
      },
      requestOptions: {
        recordLimit: -1,
      },
    });
    const options: EndpointOptions = {
      requestOptions: {
        url: 'https://example.com',
      },
    };

    const normalizedOptions = normalizeOptions(options);

    expect(normalizedOptions.frequencyOptions?.cacheCleanupIntervalSeconds).toEqual(
      DEFFAULT_CACHE_CLEANUP_INTERVAL_SECONDS
    );
    expect(normalizedOptions.frequencyOptions?.frequencyStrategyTTL).toEqual(DEFAULT_FREQUENCY_STRATEGY_TTL);
    expect(normalizedOptions.consoleOptions?.logThrottleWarningsThreshold).toEqual(
      DEFAULT_LOG_THROTTLE_WARNINGS_THRESHOLD
    );
    expect(normalizedOptions.requestOptions?.recordLimit).toEqual(DEFAULT_RECORD_LIMIT);
  });

  it('should handle undefined request url', () => {
    setOptionsDefaults({
      requestOptions: {
        method: 'GET',
        recordLimit: 50,
        responseType: 'text',
      },
    });

    const normalizedOptions = normalizeOptions({});
    expect(normalizedOptions.requestOptions.url).toEqual('');
  });
});
