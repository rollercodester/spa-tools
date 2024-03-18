import { normalizeDate } from '../dates/normalize-date';
import { DateInput } from '../dates/types';

/**
 * Checks if a given date input is tomorrow.
 */
export function isTomorrow(date: DateInput) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const normDate = normalizeDate(date);

  return (
    normDate.getDate() === tomorrow.getDate() &&
    normDate.getMonth() === tomorrow.getMonth() &&
    normDate.getFullYear() === tomorrow.getFullYear()
  );
}
