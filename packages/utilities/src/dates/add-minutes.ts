import { normalizeDate } from './normalize-date';
import { DateInput } from './types';

/**
 * Adds the specified number of minutes to a given date input, returning a new Date object.
 *
 * A negative number of minutes can be passed to subtract minutes.
 */
export function addMinutes(date: DateInput, minutes: number): Date {
  const newDate = normalizeDate(date);
  newDate.setMinutes(newDate.getMinutes() + minutes);
  return newDate;
}
