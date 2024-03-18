import { pick } from './pick';

describe('pick', () => {
  it('should return a new object with the picked properties', () => {
    const obj = {
      age: 30,
      city: 'New York',
      name: 'John',
    };

    const picked = pick(obj, 'name', 'age');

    expect(picked).toEqual({
      age: 30,
      name: 'John',
    });
  });

  it('should return an empty object if no properties are picked', () => {
    const obj = {
      age: 30,
      city: 'New York',
      name: 'John',
    };

    const picked = pick(obj);

    expect(picked).toEqual({});
  });

  it('should ignore properties that do not exist in the object', () => {
    const obj = {
      age: 30,
      city: 'New York',
      name: 'John',
    };

    const picked = pick(obj, 'name', 'gender');

    expect(picked).toEqual({
      name: 'John',
    });
  });
});
