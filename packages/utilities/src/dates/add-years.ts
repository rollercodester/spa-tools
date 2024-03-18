import { roundToNearest } from '../numbers';
import { addDays } from './add-days';
import { isLeapYear } from '../conditionals/is-leap-year';
import { normalizeDate } from './normalize-date';
import { DateInput } from './types';

/**
 * Adds the specified number of years to a given date input, returning a new Date object.
 *
 * A negative number of years can be passed to subtract years.
 */
export function addYears(date: DateInput, years: number): Date {
  const normYears = roundToNearest(years, 1);
  let newDate = normalizeDate(date);
  const isOriginal28thFebNonLeapYear = newDate.getMonth() === 1 && newDate.getDate() === 28 && !isLeapYear(newDate);
  const isOriginal29thFebLeapYear = newDate.getMonth() === 1 && newDate.getDate() === 29 && isLeapYear(newDate);

  newDate.setFullYear(newDate.getFullYear() + normYears);

  const isNew28thFebLeapYear = newDate.getMonth() === 1 && newDate.getDate() === 28 && isLeapYear(newDate);
  const isNew29thFeb = newDate.getMonth() === 1 && newDate.getDate() === 29;
  const isNew28thFeb = newDate.getMonth() === 1 && newDate.getDate() === 28;

  if (years > 0) {
    if (isOriginal29thFebLeapYear && !isNew29thFeb && !isNew28thFeb && !isLeapYear(newDate)) {
      newDate = addDays(newDate, -1); // Leap day doesn't exist in new year so move backward one day
    } else if (isOriginal28thFebNonLeapYear && isNew28thFebLeapYear) {
      newDate = addDays(newDate, 1); // Moved from non-leap year to leap year so move forward one day
    }
  } else if (years < 0 && isOriginal28thFebNonLeapYear && isNew28thFeb && isLeapYear(newDate)) {
    newDate = addDays(newDate, 1); // Moved back from leap year to non-leap year so move backward one day
  }

  return newDate;
}
