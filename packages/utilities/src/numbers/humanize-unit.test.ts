import { humanizeUnit } from './humanize-unit';

describe('humanizeUnit', () => {
  it('should format positive value without units', () => {
    const value = 123;
    const expected = ['123', ''] as const;
    const result = humanizeUnit(value);
    expect(result).toEqual(expected);
  });

  it('should format negative value without units', () => {
    const value = -123;
    const expected = ['-123', ''] as const;
    const result = humanizeUnit(value);
    expect(result).toEqual(expected);
  });

  it('should format positive value with units', () => {
    const value = 1234567;
    const expected = ['1.2', 'M'] as const;
    const result = humanizeUnit(value);
    expect(result).toEqual(expected);
  });

  it('should format negative value with units', () => {
    const value = -1235567;
    const expected = ['-1.24', 'M'] as const;
    const result = humanizeUnit(value, { decimalPlaces: 2 });
    expect(result).toEqual(expected);
  });

  it('should format positive value with custom units', () => {
    const value = 1234567890;
    const units = [' KB', ' MB', ' GB', ' TB'];
    const expected = ['1.1', ' GB'] as const;
    const result = humanizeUnit(value, { basis: 1024, units });
    expect(result).toEqual(expected);
  });

  it('should format negative value with custom units', () => {
    const value = -1234567890;
    const units = [' KB', ' MB', ' GB', ' TB'];
    const expected = ['-1.1', ' GB'] as const;
    const result = humanizeUnit(value, { basis: 1024, units });
    expect(result).toEqual(expected);
  });

  it('should format value with decimal places', () => {
    const value = 1234567.89;
    const decimalPlaces = 2;
    const expected = ['1.23', 'M'];
    const result = humanizeUnit(value, { decimalPlaces });
    expect(result).toEqual(expected);
  });

  it('should handle values with no fractional results', () => {
    const value = 1000;
    const units = [' Tens', ' Hundreds', ' Thousands', ' Ten Thousands'];
    const expected = ['1', ' Thousands'] as const;
    const result = humanizeUnit(value, { basis: 10, units });
    expect(result).toEqual(expected);
  });
});
