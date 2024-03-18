import { deepMerge } from '../../utilities/src/data/deep-merge';
import { __optionsDefaults, optionsDefaults, setOptionsDefaults } from './set-options-defaults';
import { EndpointOptionsDefaults, NormEndpointOptionsDefaults } from './types';

describe('setOptionsDefaults', () => {
  afterEach(() => {
    // Reset optionsDefaults to its original state after each test
    setOptionsDefaults({});
  });

  it('should merge the provided defaults with the existing optionsDefaults', () => {
    const defaultsToMerge: EndpointOptionsDefaults = {
      consoleOptions: {
        logThrottleWarnings: false,
      },
      frequencyOptions: {
        cacheCleanupIntervalSeconds: 600,
      },
      requestOptions: {
        errorOn404: true,
      },
      serverModelOptions: {
        jsonDataDotPath: 'result.data',
        jsonErrorDotPath: 'result.error',
      },
    };

    const expectedDefaults = deepMerge<NormEndpointOptionsDefaults>(__optionsDefaults, defaultsToMerge);

    setOptionsDefaults(defaultsToMerge);

    expect(optionsDefaults).toEqual(expectedDefaults);
  });
});
