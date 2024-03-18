import { normalizeDate } from './normalize-date';
import { DateInput } from './types';

/**
 * Adds the specified number of weeks to a given date input, returning a new Date object.
 *
 * A negative number of weeks can be passed to subtract weeks.
 */
export function addWeeks(date: DateInput, weeks: number): Date {
  const newDate = normalizeDate(date);
  newDate.setDate(newDate.getDate() + weeks * 7);
  return newDate;
}
