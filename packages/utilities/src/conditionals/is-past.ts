import { normalizeDate } from '../dates/normalize-date';
import { DateInput } from '../dates/types';

/**
 * Checks if a given date input is in the past.
 */
export function isPast(date: DateInput) {
  const normDate = normalizeDate(date);
  return normDate.getTime() < Date.now();
}
