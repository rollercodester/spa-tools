import { getNestedValue } from './get-nested-value';

describe('getNestedValue', () => {
  it('should return the nested value when it exists', () => {
    const data = {
      foo: {
        bar: {
          baz: 'nested value',
        },
      },
    };

    const result = getNestedValue(data, 'foo.bar.baz', '');

    expect(result).toBe('nested value');
  });

  it('should return the default value when the nested value does not exist', () => {
    const data = {
      foo: {
        bar: {
          baz: 'nested value',
        },
      },
    };

    const result = getNestedValue(data, 'foo.bar.qux', 'default value');

    expect(result).toBe('default value');
  });

  it('should return the default value when the data dotpath is empty', () => {
    const data = {
      foo: {
        bar: {
          baz: 'nested value',
        },
      },
    };

    const result = getNestedValue(data, 'foo.bar.', 'default value');

    expect(result).toBe('default value');
  });

  it('should return the default value when the data dotpath does not traverse object', () => {
    const data = {
      foo: {
        bar: 'baz',
      },
    };

    const result = getNestedValue(data, 'foo.bar.baz', 'default value');

    expect(result).toBe('default value');
  });

  it('should return the default value when the data is not a record', () => {
    const data = 'not a record';

    const result = getNestedValue(data, 'foo.bar.baz', 'default value');

    expect(result).toBe('default value');
  });

  it('should return the default value when the data dot path is empty', () => {
    const data = {
      foo: {
        bar: {
          baz: 'nested value',
        },
      },
    };

    const result = getNestedValue(data, '', 'default value');

    expect(result).toBe('default value');
  });
  it('should return the default value when dot path does not contain a dot', () => {
    const data = {
      foo: {
        bar: {
          baz: 'nested value',
        },
      },
    };

    const result = getNestedValue(data, 'no-dot', 'default value');

    expect(result).toBe('default value');
  });
});
