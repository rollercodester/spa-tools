import { isTomorrow } from './is-tomorrow';

describe('isTomorrow', () => {
  test('should return true if the date is tomorrow', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    expect(isTomorrow(tomorrow)).toBe(true);
  });

  test('should return false if the date is not tomorrow', () => {
    const today = new Date();
    expect(isTomorrow(today)).toBe(false);
  });
});
