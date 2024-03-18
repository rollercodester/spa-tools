import { mockWindowHistory, mockWindowLocation, restoreWindowHistory, restoreWindowLocation } from '../../../../mocks';
import { getStorageKey, parseQueryState, pushQueryState } from './query-state';

describe('parseQueryState', () => {
  beforeAll(() => {
    mockWindowHistory();
    mockWindowLocation('https://spatools');
  });
  afterAll(() => {
    restoreWindowHistory();
    restoreWindowLocation();
  });
  afterEach(() => {
    const storageKey = getStorageKey();
    localStorage.setItem(storageKey, '');
  });

  it('should return null when no query parameters are present', () => {
    window.location.search = '';
    const result = parseQueryState();
    expect(result).toEqual(null);
  });

  it('should handle query parameters with single values', () => {
    window.location.search = '?bar=123&foo=abc';
    const result = parseQueryState();
    expect(result).toEqual({
      bar: '123',
      foo: 'abc',
    });
  });

  it('should handle query parameters with multiple values', () => {
    window.location.search = '?bar=123&bar=456&bar=789&foo=abc';
    const result = parseQueryState();
    expect(result).toEqual({
      bar: ['123', '456', '789'],
      foo: 'abc',
    });
  });

  it('should handle initialize values from local storage', () => {
    const storageKey = getStorageKey();
    localStorage.setItem(storageKey, JSON.stringify({ firstName: 'John', lastName: 'Doe' }));
    window.location.search = '?bar=123&bar=456&foo=abc';
    const result = parseQueryState(true);
    expect(result).toEqual({
      bar: ['123', '456'],
      firstName: 'John',
      foo: 'abc',
      lastName: 'Doe',
    });
  });
});

describe('pushQueryState', () => {
  beforeAll(() => {
    mockWindowHistory();
    mockWindowLocation('https://spatools');
  });
  afterAll(() => {
    restoreWindowHistory();
    restoreWindowLocation();
  });

  it('should update the URL search params with the provided options', () => {
    pushQueryState({ baz: 123, foo: 'bar' });
    expect(window.location.search).toBe('?baz=123&foo=bar');
  });

  it('should handle array values in the options', () => {
    pushQueryState({ foo: ['bar', 'baz'] });
    expect(window.location.search).toBe('?foo=bar&foo=baz');
  });

  it('should clear the URL search params if no options are provided', () => {
    window.location.search = '?foo=bar&baz=123';
    pushQueryState(null);
    expect(window.location.search).toBe('');
  });

  it('should update local storage with the provided options', () => {
    const storageKey = getStorageKey();
    pushQueryState({ baz: 123, foo: 'bar' }, true);
    expect(localStorage.getItem(storageKey)).toBe('{"baz":123,"foo":"bar"}');
  });
});
