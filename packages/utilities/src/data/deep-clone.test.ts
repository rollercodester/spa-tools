import { deepClone } from './deep-clone';

describe('deepClone', () => {
  it('should return the same value for primitive types', () => {
    expect(deepClone(5)).toBe(5);
    expect(deepClone('hello')).toBe('hello');
    expect(deepClone(true)).toBe(true);
    expect(deepClone(null)).toBe(null);
    expect(deepClone(undefined)).toBe(undefined);
  });

  it('should return a new Date object with the same value', () => {
    const date = new Date();
    const clonedDate = deepClone(date);
    expect(clonedDate).toBeInstanceOf(Date);
    expect(clonedDate.getTime()).toBe(date.getTime());
  });

  it('should return a new array with cloned elements', () => {
    const array = [1, 2, 3];
    const clonedArray = deepClone(array);
    expect(clonedArray).toEqual(array);
    expect(clonedArray).not.toBe(array);
    expect(clonedArray[0]).toBe(1);
    expect(clonedArray[1]).toBe(2);
    expect(clonedArray[2]).toBe(3);
  });

  it('should return a new object with cloned properties', () => {
    const obj = { age: 30, name: 'John' };
    const clonedObj = deepClone(obj);
    expect(clonedObj).toEqual(obj);
    expect(clonedObj).not.toBe(obj);
    expect(clonedObj.name).toBe('John');
    expect(clonedObj.age).toBe(30);
  });

  it('should handle nested objects and arrays', () => {
    const obj = { address: { city: 'New York', country: 'USA' }, hobbies: ['reading', 'coding'], name: 'John' };
    const clonedObj = deepClone(obj);
    expect(clonedObj).toEqual(obj);
    expect(clonedObj).not.toBe(obj);
    expect(clonedObj.hobbies).toEqual(obj.hobbies);
    expect(clonedObj.hobbies).not.toBe(obj.hobbies);
    expect(clonedObj.address).toEqual(obj.address);
    expect(clonedObj.address).not.toBe(obj.address);
  });

  it('should return a deep clone of an object', () => {
    const originalObject = { a: 1, b: { c: 2 } };
    const clonedObject1 = deepClone(originalObject);
    const clonedObject2 = deepClone(originalObject);
    originalObject.b.c = 3;

    expect(clonedObject1.b.c).toEqual(2);
    expect(clonedObject1).not.toEqual(originalObject);
    expect(clonedObject1).toEqual(clonedObject2);
    expect(clonedObject1).not.toBe(clonedObject2);
    expect(clonedObject1.b).not.toBe(clonedObject2.b);
  });

  it('should return the same value for non-object values', () => {
    expect(deepClone(123)).toBe(123);
    expect(deepClone('hello')).toBe('hello');
    expect(deepClone(null)).toBe(null);
    expect(deepClone(undefined)).toBe(undefined);
  });

  it('should return a deep clone of an array', () => {
    const originalArray = [1, 2, 3];
    const clonedArray = deepClone(originalArray);

    expect(clonedArray).toEqual(originalArray);
    expect(clonedArray).not.toBe(originalArray);
  });
});
