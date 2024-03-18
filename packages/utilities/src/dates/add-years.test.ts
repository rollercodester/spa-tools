import { addYears } from './add-years';

describe('addYears', () => {
  test('should add years to a date', () => {
    const date = new Date(2022, 0, 1);
    const years = 5;
    const expectedDate = new Date(2027, 0, 1);
    expect(addYears(date, years)).toEqual(expectedDate);
  });

  test('should add negative years to a date', () => {
    const date = new Date(2022, 0, 1);
    const years = -3;
    const expectedDate = new Date(2019, 0, 1);
    expect(addYears(date, years)).toEqual(expectedDate);
  });

  test('should handle leap year to non-leap year correctly', () => {
    const date = new Date(2020, 1, 29); // Leap year
    const years = 1;
    const expectedDate = new Date(2021, 1, 28); // Non-leap year
    expect(addYears(date, years)).toEqual(expectedDate);
  });

  test('should handle non-leap year to leap year correctly', () => {
    const date = new Date(2019, 1, 28); // Non-Leap year
    const years = 1;
    const expectedDate = new Date(2020, 1, 29); // Leap year
    expect(addYears(date, years)).toEqual(expectedDate);
  });

  test('should handle leap year to leap year correctly', () => {
    const date = new Date(2020, 1, 29); // Leap year
    const years = 4;
    const expectedDate = new Date(2024, 1, 29); // Leap year
    expect(addYears(date, years)).toEqual(expectedDate);
  });

  test('should handle negative non-leap year to leap-year correctly', () => {
    const date = new Date(2021, 1, 28); // Non-leap year
    const years = -1;
    const expectedDate = new Date(2020, 1, 29); // Leap year
    expect(addYears(date, years)).toEqual(expectedDate);
  });

  test('should handle negative leap year to leap year correctly', () => {
    const date = new Date(2024, 1, 29); // leap year
    const years = -4;
    const expectedDate = new Date(2020, 1, 29); // Leap year
    expect(addYears(date, years)).toEqual(expectedDate);
  });

  // original 28th Feb non-leap year
  // new is 28th Feb but is leap year
});
