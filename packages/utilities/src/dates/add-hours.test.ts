import { addHours } from './add-hours';

describe('addHours', () => {
  test('should add hours to a date', () => {
    const date = new Date('2022-01-01T12:00:00Z');
    const hours = 3;
    const expectedDate = new Date('2022-01-01T15:00:00Z');
    expect(addHours(date, hours)).toEqual(expectedDate);
  });

  test('should handle negative hours', () => {
    const date = new Date('2022-01-01T12:00:00Z');
    const hours = -3;
    const expectedDate = new Date('2022-01-01T09:00:00Z');
    expect(addHours(date, hours)).toEqual(expectedDate);
  });

  test('should handle adding zero hours', () => {
    const date = new Date('2022-01-01T12:00:00Z');
    const hours = 0;
    const expectedDate = new Date('2022-01-01T12:00:00Z');
    expect(addHours(date, hours)).toEqual(expectedDate);
  });
});
