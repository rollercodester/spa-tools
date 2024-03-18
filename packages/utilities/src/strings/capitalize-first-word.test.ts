import { capitalizeFirstWord } from './capitalize-first-word';

describe('capitalizeFirstWord', () => {
  test('should capitalize the first word of a string', () => {
    const input = 'hello world';
    const expectedOutput = 'Hello world';

    const result = capitalizeFirstWord(input);

    expect(result).toBe(expectedOutput);
  });

  test('should return an empty string if input is empty', () => {
    const input = '';
    const expectedOutput = '';

    const result = capitalizeFirstWord(input);

    expect(result).toBe(expectedOutput);
  });

  test('should return the same string if the first character is already capitalized', () => {
    const input = 'Hello world';
    const expectedOutput = 'Hello world';

    const result = capitalizeFirstWord(input);

    expect(result).toBe(expectedOutput);
  });
});
