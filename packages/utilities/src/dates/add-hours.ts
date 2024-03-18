import { normalizeDate } from './normalize-date';
import { DateInput } from './types';

/**
 * Adds the specified number of hours to a given date input, returning a new Date object.
 *
 * A negative number of hours can be passed to subtract hours.
 */
export function addHours(date: DateInput, hours: number): Date {
  const newDate = normalizeDate(date);
  newDate.setHours(newDate.getHours() + hours);
  return newDate;
}
