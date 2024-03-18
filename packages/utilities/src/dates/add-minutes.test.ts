import { addMinutes } from './add-minutes';

describe('addMinutes', () => {
  test('should add minutes to a date', () => {
    const date = new Date('2022-01-01T00:00:00Z');
    const minutes = 30;
    const expectedDate = new Date('2022-01-01T00:30:00Z');
    expect(addMinutes(date, minutes)).toEqual(expectedDate);
  });

  test('should handle negative minutes', () => {
    const date = new Date('2022-01-01T00:30:00Z');
    const minutes = -15;
    const expectedDate = new Date('2022-01-01T00:15:00Z');
    expect(addMinutes(date, minutes)).toEqual(expectedDate);
  });

  test('should handle zero minutes', () => {
    const date = new Date('2022-01-01T00:00:00Z');
    const minutes = 0;
    const expectedDate = new Date('2022-01-01T00:00:00Z');
    expect(addMinutes(date, minutes)).toEqual(expectedDate);
  });
});
