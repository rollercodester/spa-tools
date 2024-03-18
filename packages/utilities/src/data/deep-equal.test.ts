import { deepEqual } from './deep-equal';

describe('deepEqual', () => {
  it('should return true for equal primitive values', () => {
    expect(deepEqual(5, 5)).toBe(true);
    expect(deepEqual('hello', 'hello')).toBe(true);
    expect(deepEqual(true, true)).toBe(true);
  });

  it('should return false for different primitive values', () => {
    expect(deepEqual(5, 10)).toBe(false);
    expect(deepEqual('hello', 'world')).toBe(false);
    expect(deepEqual(true, false)).toBe(false);
  });

  it('should return true for equal objects', () => {
    const obj1 = { age: 30, name: 'John' };
    const obj2 = { age: 30, name: 'John' };
    expect(deepEqual(obj1, obj2)).toBe(true);
  });

  it('should return false for different objects', () => {
    const obj1 = { age: 30, name: 'John' };
    const obj2 = { age: 30, name: 'Jane' };
    const obj3 = { age: 30 };
    expect(deepEqual(obj1, obj2)).toBe(false);
    expect(deepEqual(obj1, obj3)).toBe(false);
  });

  it('should return true for equal arrays', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3];
    expect(deepEqual(arr1, arr2)).toBe(true);
  });

  it('should return false for different arrays', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 4];
    expect(deepEqual(arr1, arr2)).toBe(false);
  });

  it('should return true for equal nested objects', () => {
    const obj1 = { address: { city: 'New York', country: 'USA' }, name: 'John' };
    const obj2 = { address: { city: 'New York', country: 'USA' }, name: 'John' };
    expect(deepEqual(obj1, obj2)).toBe(true);
  });

  it('should return false for different nested objects', () => {
    const obj1 = { address: { city: 'New York', country: 'USA' }, name: 'John' };
    const obj2 = { address: { city: 'Los Angeles', country: 'USA' }, name: 'John' };
    expect(deepEqual(obj1, obj2)).toBe(false);
  });
});
