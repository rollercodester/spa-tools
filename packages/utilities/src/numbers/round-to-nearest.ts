/**
 * Round a number to the nearest decimal place.
 */
export function roundToNearest(num: number, decimalPlaces = 0) {
  const p = Math.pow(10, decimalPlaces);
  const n = num * p * (1 + Number.EPSILON);
  return Math.round(n) / p;
}
