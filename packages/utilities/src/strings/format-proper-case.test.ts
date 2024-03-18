import { formatProperCase } from './format-proper-case';

describe('formatProperCase', () => {
  it('should format a string to title case', () => {
    const input = 'hello world';
    const expectedOutput = 'Hello World';

    const result = formatProperCase(input);

    expect(result).toEqual(expectedOutput);
  });

  it('should handle an empty string', () => {
    const input = '';
    const expectedOutput = '';

    const result = formatProperCase(input);

    expect(result).toEqual(expectedOutput);
  });

  it('should handle a string with all uppercase letters', () => {
    const input = 'HELLO WORLD';
    const expectedOutput = 'Hello World';

    const result = formatProperCase(input);

    expect(result).toEqual(expectedOutput);
  });

  it('should handle a string with all lowercase letters', () => {
    const input = 'hello world';
    const expectedOutput = 'Hello World';

    const result = formatProperCase(input);

    expect(result).toEqual(expectedOutput);
  });

  it('should handle a string with special characters', () => {
    const input = 'hello-world';
    const expectedOutput = 'Hello-World';

    const result = formatProperCase(input);

    expect(result).toEqual(expectedOutput);
  });
});
