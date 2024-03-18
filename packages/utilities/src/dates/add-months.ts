import { normalizeDate } from './normalize-date';
import { DateInput } from './types';

/**
 * Adds the specified number of months to a given date input, returning a new Date object.
 *
 * A negative number of months can be passed to subtract months.
 */
export function addMonths(date: DateInput, months: number): Date {
  const newDate = normalizeDate(date);
  newDate.setMonth(newDate.getMonth() + months);
  return newDate;
}
