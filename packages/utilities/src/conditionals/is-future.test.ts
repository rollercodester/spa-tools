import { isFuture } from './is-future';

describe('isFuture', () => {
  test('should return true if the date is in the future', () => {
    const futureDate = new Date(Date.now() + 86400000); // 24 hours from now
    expect(isFuture(futureDate)).toBe(true);
  });

  test('should return false if the date is in the past', () => {
    const pastDate = new Date(Date.now() - 86400000); // 24 hours ago
    expect(isFuture(pastDate)).toBe(false);
  });

  test('should return false if the date is the current date', () => {
    const currentDate = new Date();
    expect(isFuture(currentDate)).toBe(false);
  });
});
