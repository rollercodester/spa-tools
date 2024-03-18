import { deepMerge } from './deep-merge';

describe('deepMerge Left', () => {
  test('should merge two objects deeply and prioritize left values', () => {
    const left = {
      address: {
        city: 'New York',
        country: 'USA',
        zip: {
          code: 12345,
          suffix: 6789,
        },
      },
      age: 30,
    };

    const right = {
      address: {
        city: 'Los Angeles',
        zip: '12345-6789',
      },
      age: 35,
      employer: {
        name: 'Acme',
        title: 'CEO',
      },
      name: 'John',
    };

    const result = deepMerge(left, right, 'left');

    expect(result).toEqual({
      address: {
        city: 'New York',
        country: 'USA',
        zip: {
          code: 12345,
          suffix: 6789,
        },
      },
      age: 30,
      employer: {
        name: 'Acme',
        title: 'CEO',
      },
      name: 'John',
    });
  });

  test('should return the left object if the right object is not an object', () => {
    const left = {
      age: 30,
      name: 'John',
    };

    const right = 'Not an object';

    const result = deepMerge(left, right, 'left');

    expect(result).toEqual(left);
  });

  test('should return the left object if the left object is not an object', () => {
    const left = 'Not an object';

    const right = {
      age: 30,
      name: 'John',
    };

    const result = deepMerge(left, right, 'left');

    expect(result).toEqual(left);
  });

  test('should merge two arrays', () => {
    const left = [1, 2, 3];
    const right = [4, 5, 6];

    const result = deepMerge(left, right, 'left');

    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
  });
});

describe('deepMerge Right', () => {
  test('should merge two objects deeply and prioritize right values', () => {
    const left = {
      address: {
        city: 'New York',
        country: 'USA',
        zip: {
          code: 6789,
          suffix: 12345,
        },
      },
      age: 30,
      employer: {
        name: 'Acme',
        title: 'CEO',
      },
      name: 'John',
    };

    const right = {
      address: {
        city: 'Los Angeles',
        zip: {
          code: 12345,
          suffix: 6789,
        },
      },
      age: 35,
    };

    const result = deepMerge(left, right);

    right.age = 42;

    expect(result).toEqual({
      address: {
        city: 'Los Angeles',
        country: 'USA',
        zip: {
          code: 12345,
          suffix: 6789,
        },
      },
      age: 35,
      employer: {
        name: 'Acme',
        title: 'CEO',
      },
      name: 'John',
    });
  });

  test('should return the right object if the left object is not an object', () => {
    const left = 'Not an object';

    const right = {
      age: 30,
      name: 'John',
    };

    const result = deepMerge(left, right, 'right');

    expect(result).toEqual(right);
  });

  test('should return the right object if the right object is not an object', () => {
    const left = {
      age: 30,
      name: 'John',
    };

    const right = 'Not an object';

    const result = deepMerge(left, right);

    expect(result).toEqual(right);
  });

  test('should merge two arrays', () => {
    const left = [1, 2, 3];
    const right = [4, 5, 6];

    const result = deepMerge(left, right);

    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
