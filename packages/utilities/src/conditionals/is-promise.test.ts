import { isPromise } from './is-promise';

describe('isPromise', () => {
  it('should return true if the object is a promise', () => {
    const promise = new Promise<void>((resolve) => {
      resolve();
    });

    expect(isPromise(promise)).toBe(true);
  });

  it('should return false if the object is not a promise', () => {
    expect(isPromise('not a promise')).toBe(false);
    expect(isPromise(123)).toBe(false);
    expect(isPromise({})).toBe(false);
    expect(isPromise(null)).toBe(false);
    expect(isPromise(undefined)).toBe(false);
    expect(isPromise(() => {})).toBe(false);
  });
});
