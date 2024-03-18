import { formatFloat } from './format-float';

describe('formatFloat', () => {
  it('should format positive float value with default options', () => {
    const value = 1234.5678;
    const expected = '1,234.57';

    const result = formatFloat(value);

    expect(result).toBe(expected);
  });

  it('should format positive float value with custom decimal places and grouping', () => {
    const value = 1234.5678;
    const decimalPlaces = 3;
    const useGrouping = false;
    const expected = '1234.568';

    const result = formatFloat(value, decimalPlaces, useGrouping);

    expect(result).toBe(expected);
  });

  it('should format negative float value with parenthetical negatives', () => {
    const value = -1234.5678;
    const decimalPlaces = 2;
    const useGrouping = true;
    const parentheticalNegatives = true;
    const expected = '(1,234.57)';

    const result = formatFloat(value, decimalPlaces, useGrouping, parentheticalNegatives);

    expect(result).toBe(expected);
  });

  it('should not format with parenthetical with positive float value', () => {
    const value = 1234.5678;
    const decimalPlaces = 2;
    const useGrouping = true;
    const parentheticalNegatives = true;
    const expected = '1,234.57';

    const result = formatFloat(value, decimalPlaces, useGrouping, parentheticalNegatives);

    expect(result).toBe(expected);
  });

  it('should format zero value with default options', () => {
    const value = 0;
    const expected = '0.00';

    const result = formatFloat(value);

    expect(result).toBe(expected);
  });

  it('should format negative float value with default options', () => {
    const value = -1234.5678;
    const expected = '-1,234.57';

    const result = formatFloat(value);

    expect(result).toBe(expected);
  });

  it('should format negative float value with custom decimal places and grouping', () => {
    const value = -1234.5678;
    const decimalPlaces = 3;
    const useGrouping = false;
    const expected = '-1234.568';

    const result = formatFloat(value, decimalPlaces, useGrouping);

    expect(result).toBe(expected);
  });
});
