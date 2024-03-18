import { formatMoney } from './format-money';

describe('formatMoney', () => {
  it('should format the money value with symbol and default decimal places', () => {
    const value = 1234.5678;
    const currency = 'USD';
    const expected = '$1,234.57';

    const result = formatMoney(value, currency);

    expect(result).toBe(expected);
  });

  it('should format the money value without symbol and custom decimal places', () => {
    const value = 1234.5678;
    const currency = 'USD';
    const excludeSymbol = true;
    const decimalPlaces = 3;
    const expected = '1,234.568';

    const result = formatMoney(value, currency, excludeSymbol, decimalPlaces);

    expect(result).toBe(expected);
  });

  it('should return an empty string for undefined value', () => {
    const value = undefined;
    const currency = 'USD';
    const expected = '';

    const result = formatMoney(value, currency);

    expect(result).toBe(expected);
  });
});
