import { normalizeDate } from './normalize-date';
import { DateInput } from './types';

/**
 * Adds the specified number of seconds to a given date input, returning a new Date object.
 *
 * A negative number of seconds can be passed to subtract seconds.
 */
export function addSeconds(date: DateInput, seconds: number): Date {
  const newDate = normalizeDate(date);
  newDate.setSeconds(newDate.getSeconds() + seconds);
  return newDate;
}
