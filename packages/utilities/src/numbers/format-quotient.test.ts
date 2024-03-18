import { formatQuotient } from './format-quotient';

describe('formatQuotient', () => {
  it('should format the number to quotient with default parameters', () => {
    const number = 1000000;
    const expected = '1';

    const result = formatQuotient(number);

    expect(result).toBe(expected);
  });

  it('should format the number to quotient with custom divisor', () => {
    const number = 2000000;
    const divisor = 1000000;
    const expected = '2';

    const result = formatQuotient(number, { divisor });

    expect(result).toBe(expected);
  });

  it('should format the number to quotient with custom maximum fraction digits', () => {
    const number = 1500000;
    const decimalPlaces = 2;
    const expected = '1.50';

    const result = formatQuotient(number, { decimalPlaces });

    expect(result).toBe(expected);
  });

  it('should format the number to quotient with custom divisor and maximum fraction digits', () => {
    const number = 2500000;
    const divisor = 1000000;
    const decimalPlaces = 2;
    const expected = '2.50';

    const result = formatQuotient(number, { decimalPlaces, divisor });

    expect(result).toBe(expected);
  });

  it('should format the number with grouping', () => {
    const number = 2500000;
    const divisor = 10;
    const expected = '250,000';

    const result = formatQuotient(number, { divisor });

    expect(result).toBe(expected);
  });
});
