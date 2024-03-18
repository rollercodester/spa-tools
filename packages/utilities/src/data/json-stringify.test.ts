import { jsonStringify } from './json-stringify';

describe('jsonStringify', () => {
  it('should stringify a simple object', () => {
    const obj = { age: 30, name: 'John' };
    const expected = '{"name":"John","age":30}';
    const result = jsonStringify(obj);
    expect(result).toEqual(expected);
  });

  it('should handle circular references', () => {
    const obj: Record<string, unknown> = { name: 'John' };
    obj.self = obj;
    const expected = '{"name":"John"}';
    const result = jsonStringify(obj);
    expect(result).toEqual(expected);
  });

  it('should handle nested objects with circular references', () => {
    const obj1: Record<string, unknown> = { name: 'John' };
    const obj2: Record<string, unknown> = { name: 'Jane' };
    obj1.spouse = obj2;
    obj2.spouse = obj1;
    const expected = '{"name":"John","spouse":{"name":"Jane"}}';
    const result = jsonStringify(obj1);
    expect(result).toEqual(expected);
  });

  it('should handle arrays with circular references', () => {
    const arr: unknown[] = [];
    arr.push(arr);
    const expected = '[null]';
    const result = jsonStringify(arr);
    expect(result).toEqual(expected);
  });

  it('should handle complex objects with circular references', () => {
    const obj1: Record<string, unknown> = { name: 'John' };
    const obj2: Record<string, unknown> = { name: 'Jane' };
    const obj3: Record<string, unknown> = { name: 'Alice' };
    obj1.spouse = obj2;
    obj2.spouse = obj1;
    obj3.friends = [obj1, obj2];
    const expected =
      '{"name":"John","spouse":{"name":"Jane"},"friends":[{"name":"John","spouse":{"name":"Jane"}},{"name":"Jane","spouse":{"name":"John"}}]}';
    const result = jsonStringify(obj3);
    expect(result).toEqual(expected);
  });
});
