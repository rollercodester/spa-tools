import { addDays } from './add-days';

describe('addDays', () => {
  test('should add days to a date', () => {
    const date = new Date('2022-01-01');
    const days = 5;
    const expectedDate = new Date('2022-01-06');
    expect(addDays(date, days)).toEqual(expectedDate);
  });

  test('should subtract days from a date', () => {
    const date = new Date('2022-01-01');
    const days = -5;
    const expectedDate = new Date('2021-12-27');
    expect(addDays(date, days)).toEqual(expectedDate);
  });

  test('should handle adding zero days', () => {
    const date = new Date('2022-01-01');
    const days = 0;
    const expectedDate = new Date('2022-01-01');
    expect(addDays(date, days)).toEqual(expectedDate);
  });
});
