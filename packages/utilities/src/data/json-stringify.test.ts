import { jsonStringify } from './json-stringify';

describe('jsonStringify', () => {
  it('should stringify a simple object', () => {
    const obj = { age: 30, name: 'John' };
    const expected = '{"age":30,"name":"John"}';
    const result = jsonStringify(obj);
    expect(result).toEqual(expected);
  });

  it('should stringify an object containing a BigInt', () => {
    const obj = { age: 30, bigInt: BigInt(12345678901234567890n), name: 'John' };
    const expected = '{"age":30,"bigInt":"12345678901234567890","name":"John"}';
    const result = jsonStringify(obj);
    expect(result).toEqual(expected);
  });

  it('should handle complex objects with circular references', () => {
    const obj1: Record<string, unknown> = { name: 'John' };
    const obj2: Record<string, unknown> = { name: 'Jane' };
    const obj3: Record<string, unknown> = { name: 'Alice' };
    obj1.spouse = obj2;
    obj2.spouse = obj1;
    obj3.friends = [obj1, obj2];
    obj1.friends = [obj3];
    obj2.friends = [obj3];

    const result1 = jsonStringify(obj1);
    const result2 = jsonStringify(obj2);
    const result3 = jsonStringify(obj3);

    expect(result1).toEqual(
      '{"name":"John","spouse":{"name":"Jane","spouse":"[Circular Reference]","friends":[{"name":"Alice","friends":["[Circular Reference]","[Circular Reference]"]}]},"friends":[{"name":"Alice","friends":["[Circular Reference]",{"name":"Jane","spouse":"[Circular Reference]","friends":["[Circular Reference]"]}]}]}'
    );
    expect(result2).toEqual(
      '{"name":"Jane","spouse":{"name":"John","spouse":"[Circular Reference]","friends":[{"name":"Alice","friends":["[Circular Reference]","[Circular Reference]"]}]},"friends":[{"name":"Alice","friends":[{"name":"John","spouse":"[Circular Reference]","friends":["[Circular Reference]"]},"[Circular Reference]"]}]}'
    );
    expect(result3).toEqual(
      '{"name":"Alice","friends":[{"name":"John","spouse":{"name":"Jane","spouse":"[Circular Reference]","friends":["[Circular Reference]"]},"friends":["[Circular Reference]"]},{"name":"Jane","spouse":{"name":"John","spouse":"[Circular Reference]","friends":["[Circular Reference]"]},"friends":["[Circular Reference]"]}]}'
    );
  });
});
