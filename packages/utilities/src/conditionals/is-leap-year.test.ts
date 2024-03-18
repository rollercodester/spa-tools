import { isLeapYear } from './is-leap-year';

describe('isLeapYear', () => {
  test('should return true for a leap year', () => {
    const leapYear = new Date(2020, 1, 1); // February 1, 2020
    expect(isLeapYear(leapYear)).toBe(true);
  });

  test('should return false for a non-leap year', () => {
    const nonLeapYear = new Date(2021, 1, 1); // February 1, 2021
    expect(isLeapYear(nonLeapYear)).toBe(false);
  });

  test('should return true for a leap year divisible by 400', () => {
    const leapYearDivisibleBy400 = new Date(2000, 1, 1); // February 1, 2000
    expect(isLeapYear(leapYearDivisibleBy400)).toBe(true);
  });

  test('should return false for a non-leap year divisible by 100', () => {
    const nonLeapYearDivisibleBy100 = new Date(1900, 1, 1); // February 1, 1900
    expect(isLeapYear(nonLeapYearDivisibleBy100)).toBe(false);
  });
});
