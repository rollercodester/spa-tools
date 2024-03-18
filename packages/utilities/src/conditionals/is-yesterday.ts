import { normalizeDate } from '../dates/normalize-date';
import { DateInput } from '../dates/types';

/**
 * Checks if a given date input is yesterday.
 */
export function isYesterday(date: DateInput) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const normDate = normalizeDate(date);

  return (
    normDate.getDate() === yesterday.getDate() &&
    normDate.getMonth() === yesterday.getMonth() &&
    normDate.getFullYear() === yesterday.getFullYear()
  );
}
