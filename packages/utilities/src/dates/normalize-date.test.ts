import { normalizeDate } from './normalize-date';

describe('normalizeDate', () => {
  test('should return the same date object if input is already a Date', () => {
    const date = new Date();
    expect(normalizeDate(date)).toBe(date);
  });

  test('should return a new Date object if input is a string', () => {
    const dateString = '2022-01-01';
    const expectedDate = new Date(dateString);
    expect(normalizeDate(dateString)).toEqual(expectedDate);
  });

  test('should return a new Date object if input is a number', () => {
    const timestamp = 1640995200000; // January 1, 2022
    const expectedDate = new Date(timestamp);
    expect(normalizeDate(timestamp)).toEqual(expectedDate);
  });

  test('should return a new Date object with hour precision', () => {
    const date = new Date();
    date.setMinutes(0, 0, 0);
    expect(normalizeDate(date, 'hour')).toEqual(date);
  });

  test('should return a new Date object with minute precision', () => {
    const date = new Date();
    date.setSeconds(0, 0);
    expect(normalizeDate(date, 'minute')).toEqual(date);
  });

  test('should return a new Date object with second precision', () => {
    const date = new Date();
    date.setMilliseconds(0);
    expect(normalizeDate(date, 'second')).toEqual(date);
  });

  test('should return a new Date object with millisecond precision (default)', () => {
    const date = new Date();
    expect(normalizeDate(date)).toEqual(date);
  });
});
