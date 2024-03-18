import { isToday } from './is-today';

describe('isToday', () => {
  test('should return true if the date is today', () => {
    const today = new Date();
    expect(isToday(today)).toBe(true);
  });

  test('should return false if the date is not today', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    expect(isToday(yesterday)).toBe(false);
  });
});
