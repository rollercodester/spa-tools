import { makeReadable } from './make-readable';

describe('makeReadable', () => {
  it('should format a number with default settings', () => {
    const code = 1234567890;
    const expected = '1234 5678 90';

    const result = makeReadable(code);

    expect(result).toEqual(expected);
  });

  it('should format a number with custom char groupings', () => {
    const code = 1234567890;
    const charGroupings = [2, 3, 4];
    const expected = '12 345 6789 0';

    const result = makeReadable(code, charGroupings);

    expect(result).toEqual(expected);
  });

  it('should format a string with default settings', () => {
    const code = 'abcdefghij';
    const expected = 'abcd efgh ij';

    const result = makeReadable(code);

    expect(result).toEqual(expected);
  });

  it('should format a string with custom char groupings', () => {
    const code = 'abcdefghij';
    const charGroupings = [3, 2, 1];
    const expected = 'abc de f g h i j';

    const result = makeReadable(code, charGroupings);

    expect(result).toEqual(expected);
  });

  it('should format a string with custom separator', () => {
    const code = 'abcdefghij';
    const separator = '-';
    const expected = 'abcd-efgh-ij';

    const result = makeReadable(code, undefined, separator);

    expect(result).toEqual(expected);
  });

  it('should handle invalid char groupings', () => {
    const code = 'abcdefghij';
    const charGroupings = ['x', 'y', 'z'] as unknown as number[];
    const expected = 'abcd efgh ij';

    const result = makeReadable(code, charGroupings);

    expect(result).toEqual(expected);
  });
});
