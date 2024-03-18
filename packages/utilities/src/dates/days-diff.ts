import { normalizeDate } from './normalize-date';
import { DateInput } from './types';

/**
 * Calculates the number of days between two dates.
 */
export function daysDiff(date1: DateInput, date2: DateInput): number {
  const a = normalizeDate(date1);
  const b = normalizeDate(date2);
  const diff = Math.abs(a.getTime() - b.getTime());
  return Math.ceil(diff / (1000 * 3600 * 24));
}
