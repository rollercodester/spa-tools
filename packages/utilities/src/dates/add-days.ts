import { normalizeDate } from './normalize-date';
import { DateInput } from './types';

/**
 * Adds the specified number of days to a given date input, returning a new Date object.
 *
 * A negative number of days can be passed to subtract days.
 */
export function addDays(date: DateInput, days: number): Date {
  const newDate = normalizeDate(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}
