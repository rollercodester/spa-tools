import { roundToNearest } from '.';

/**
 * Shifts the decimal places of a number and by default rounds to the nearest whole number.
 *
 * This is useful for converting a number represented as a factorial of another such as cents to a number of dollars.
 */
export function shiftDecimalPlaces(wholeNumber?: number, placesToShift?: number, resultFloatPrecision = 0) {
  if (!wholeNumber) {
    return 0;
  }

  if (!placesToShift) {
    return wholeNumber;
  }

  const answer = wholeNumber / Math.pow(10, placesToShift);

  return resultFloatPrecision <= 0 ? answer : roundToNearest(answer, resultFloatPrecision);
}
