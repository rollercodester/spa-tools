import { separateWords } from './separate-words';

describe('separateWords', () => {
  it('should separate words in a string with default separator', () => {
    const str = 'helloWorld';
    const expected = 'hello World';

    const result = separateWords(str);

    expect(result).toBe(expected);
  });

  it('should separate words in a string with custom separator', () => {
    const str = 'helloWorld';
    const separator = '-';
    const expected = 'hello-World';

    const result = separateWords(str, separator);

    expect(result).toBe(expected);
  });

  it('should not add separator if the string is already separated', () => {
    const str = 'hello World';
    const expected = 'hello World';

    const result = separateWords(str);

    expect(result).toBe(expected);
  });

  it('should handle empty string', () => {
    const str = '';
    const expected = '';

    const result = separateWords(str);

    expect(result).toBe(expected);
  });

  it('should return title case when requested', () => {
    const str = 'helloWorld';
    const expected = 'Hello World';

    const result = separateWords(str, ' ', true);

    expect(result).toBe(expected);
  });
});
