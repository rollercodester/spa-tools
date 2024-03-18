import { isYesterday } from './is-yesterday';

describe('isYesterday', () => {
  test('should return true if the date is yesterday', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    expect(isYesterday(yesterday)).toBe(true);
  });

  test('should return false if the date is not yesterday', () => {
    const today = new Date();
    expect(isYesterday(today)).toBe(false);
  });
});
