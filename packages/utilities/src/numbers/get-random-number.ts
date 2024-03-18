/**
 * Returns a random number between min (inclusive) and max (exclusive).
 *
 * If `includeMax` is true, max is inclusive.
 */
export function getRandomNumber(min: number, max: number, includeMax = true) {
  if (includeMax) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return Math.floor(Math.random() * (max - min) + min);
}
