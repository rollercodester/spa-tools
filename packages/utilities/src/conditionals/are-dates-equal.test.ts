import { areDatesEqual } from './are-dates-equal';

describe('areDatesEqual', () => {
  test('should return true when two equal dates are compared', () => {
    const date1 = new Date('2022-01-01');
    const date2 = new Date('2022-01-01');
    expect(areDatesEqual(date1, date2)).toBe(true);

    const date5 = new Date('2022-01-01');
    const date6 = date5.getTime();
    expect(areDatesEqual(date5, date6)).toBe(true);
  });

  test('should return false when two different dates are compared', async () => {
    const date1 = new Date('2022-01-01');
    const date2 = new Date('2022-01-02');
    expect(areDatesEqual(date1, date2)).toBe(false);

    const date3 = new Date();
    await new Promise((resolve) => setTimeout(resolve, 50));
    const date4 = new Date();
    expect(areDatesEqual(date3, date4)).toBe(false);

    const date5 = new Date('2022-01-01');
    const date6 = date5.getTime() + 1;
    expect(areDatesEqual(date5, date6)).toBe(false);
  });

  test('should return true when two equal dates with different timezones are compared', () => {
    const date1 = new Date('2022-01-01T00:00:00Z');
    const date2 = new Date('2022-01-01T08:00:00+08:00');
    expect(areDatesEqual(date1, date2)).toBe(true);
  });

  test('should return true when a date and a string representation of the same date are compared', () => {
    const date1 = new Date('2022-01-01T00:00:00Z');
    const date2 = '2022-01-01';
    expect(areDatesEqual(date1, date2)).toBe(true);
  });
});
