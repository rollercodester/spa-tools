import { normalizeDate } from '../dates/normalize-date';
import { DateInput } from '../dates/types';

/**
 * Checks if a given date input is in a leap year.
 */
export function isLeapYear(date: DateInput) {
  const normDate = normalizeDate(date);
  const year = normDate.getFullYear();
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
