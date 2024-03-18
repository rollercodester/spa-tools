import { omit } from './omit';

describe('omit', () => {
  it('should omit specified keys from an object', () => {
    const obj = {
      age: 30,
      email: 'john@example.com',
      id: 1,
      name: 'John',
    };

    const result = omit(obj, 'age', 'email');

    expect(result).toEqual({
      id: 1,
      name: 'John',
    });
  });

  it('should return the same object if no keys are specified', () => {
    const obj = {
      age: 30,
      email: 'john@example.com',
      id: 1,
      name: 'John',
    };

    const result = omit(obj);

    expect(result).toEqual(obj);
  });

  it('should handle empty object', () => {
    const obj = {};

    const result = omit(obj, 'age', 'email');

    expect(result).toEqual({});
  });
});
