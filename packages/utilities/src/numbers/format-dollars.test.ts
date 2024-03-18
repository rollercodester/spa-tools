import { formatDollars } from './format-dollars';

describe('formatDollars', () => {
  it('should format dollars with symbol by default', () => {
    const value = 1000;
    const expected = '$1,000.00';

    formatDollars(value);

    expect(formatDollars(value)).toEqual(expected);
  });

  it('should format dollars without symbol when excludeSymbol is true', () => {
    const value = 1000;
    const expected = '1,000.00';

    formatDollars(value, true);

    expect(formatDollars(value, true)).toEqual(expected);
  });

  it('should format dollars with custom decimal places', () => {
    const value = 1000;
    const decimalPlaces = 3;
    const expected = '$1,000.000';

    formatDollars(value, false, decimalPlaces);

    expect(formatDollars(value, false, decimalPlaces)).toEqual(expected);
  });

  it('should format undefined value as empty string', () => {
    const value = undefined;
    const expected = '';

    formatDollars(value);

    expect(formatDollars(value)).toEqual(expected);
  });
});
