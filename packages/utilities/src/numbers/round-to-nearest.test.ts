import { roundToNearest } from './round-to-nearest';

describe('roundToNearest', () => {
  test('should round a number to the nearest integer', () => {
    const num = 3.7;
    const expected = 4;
    expect(roundToNearest(num)).toEqual(expected);
  });

  test('should round a number to the nearest decimal place', () => {
    const num = 3.14159;
    const decimalPlaces = 2;
    const expected = 3.14;
    expect(roundToNearest(num, decimalPlaces)).toEqual(expected);
  });

  test('should round a negative number to the nearest integer', () => {
    const num = -5.2;
    const expected = -5;
    expect(roundToNearest(num)).toEqual(expected);
  });

  test('should round a negative number to the nearest decimal place', () => {
    const num = -3.14159;
    const decimalPlaces = 3;
    const expected = -3.142;
    expect(roundToNearest(num, decimalPlaces)).toEqual(expected);
  });

  test('should round a number with zero decimal places', () => {
    const num = 7.89;
    const decimalPlaces = 0;
    const expected = 8;
    expect(roundToNearest(num, decimalPlaces)).toEqual(expected);
  });

  test('should round a number with negative decimal places', () => {
    const num = 123.456;
    const decimalPlaces = -2;
    const expected = 100;
    expect(roundToNearest(num, decimalPlaces)).toEqual(expected);
  });
});
