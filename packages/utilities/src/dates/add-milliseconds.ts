import { normalizeDate } from './normalize-date';
import { DateInput } from './types';

/**
 * Adds the specified number of milliseconds to a given date input, returning a new Date object.
 *
 * A negative number of milliseconds can be passed to subtract milliseconds.
 */
export function addMilliseconds(date: DateInput, milliseconds: number): Date {
  const newDate = normalizeDate(date);
  newDate.setMilliseconds(newDate.getMilliseconds() + milliseconds);
  return newDate;
}
