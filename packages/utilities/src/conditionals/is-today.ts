import { normalizeDate } from '../dates/normalize-date';
import { DateInput } from '../dates/types';

/**
 * Checks if a given date input is today.
 */
export function isToday(date: DateInput) {
  const today = new Date();
  const normDate = normalizeDate(date);

  return (
    normDate.getDate() === today.getDate() &&
    normDate.getMonth() === today.getMonth() &&
    normDate.getFullYear() === today.getFullYear()
  );
}
