import { isPast } from './is-past';
import { addYears } from '../dates';

describe('isPast', () => {
  test('should return true if the date is in the past', () => {
    const pastDate = new Date('2021-01-01');
    expect(isPast(pastDate)).toBe(true);
  });

  test('should return false if the date is in the future', () => {
    const futureDate = addYears(new Date(), 1);
    expect(isPast(futureDate)).toBe(false);
  });

  test('should return false if the date is the current date', () => {
    const currentDate = new Date();
    expect(isPast(currentDate)).toBe(false);
  });
});
