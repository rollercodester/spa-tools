import { shiftDecimalPlaces } from './shift-decimal-places';

describe('shiftDecimalPlaces', () => {
  it('should return 0 if wholeNumber is not provided', () => {
    const result = shiftDecimalPlaces();
    expect(result).toBe(0);
  });

  it('should return wholeNumber if placesToShift is not provided', () => {
    const result = shiftDecimalPlaces(10);
    expect(result).toBe(10);
  });

  it('should return the correct shifted value', () => {
    const result = shiftDecimalPlaces(12345, 2);
    expect(result).toBe(123.45);
  });

  it('should round the shifted value to the specified precision', () => {
    const result = shiftDecimalPlaces(12345, 2, 1);
    expect(result).toBe(123.5);
  });
});
