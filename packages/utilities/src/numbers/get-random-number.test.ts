import { getRandomNumber } from './get-random-number';

describe('getRandomNumber', () => {
  it('should generate a random number between min and max (inclusive)', () => {
    const min = 1;
    const max = 10;

    const randomNumber = getRandomNumber(min, max);

    expect(randomNumber).toBeGreaterThanOrEqual(min);
    expect(randomNumber).toBeLessThanOrEqual(max);
  });

  it('should generate a random number between min and max (exclusive)', () => {
    const min = 1;
    const max = 10;

    const randomNumber = getRandomNumber(min, max, false);

    expect(randomNumber).toBeGreaterThanOrEqual(min);
    expect(randomNumber).toBeLessThan(max);
  });
});
