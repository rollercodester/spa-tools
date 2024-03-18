import { EndpointOptions } from '../types';
import { isEndpointOptions } from './is-endpoint-options';

describe('isEndpointOptions', () => {
  it('should return true when given an object with any of the expected properties', () => {
    const options: EndpointOptions = {
      callbackOptions: {},
      consoleOptions: {},
      frequencyOptions: {},
      interpolateUrlOptions: {},
      requestOptions: {},
      serverModelOptions: {},
    };

    expect(isEndpointOptions(options)).toBe(true);
  });

  it('should return false when given an object without any of the expected properties', () => {
    const options = {};

    expect(isEndpointOptions(options)).toBe(false);
  });

  it('should return false when given a string', () => {
    const url = 'https://example.com';

    expect(isEndpointOptions(url)).toBe(false);
  });

  it('should return false when given a state and no options object', () => {
    const state = {};

    expect(isEndpointOptions(state)).toBe(false);
  });

  it('should return true when given a state and an options object', () => {
    const state = {};
    const options: EndpointOptions = {
      callbackOptions: {},
      consoleOptions: {},
      frequencyOptions: {},
      interpolateUrlOptions: {},
      requestOptions: {},
      serverModelOptions: {},
    };

    expect(isEndpointOptions(options, state)).toBe(true);
  });
});
