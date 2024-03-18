import { normalizeDate } from '../dates/normalize-date';
import { DateInput, DatePrecision } from '../dates/types';

/**
 * Checks if two given date inputs are equal.
 */
export function areDatesEqual(date1: DateInput, date2: DateInput, precision: DatePrecision = 'millisecond') {
  const normDate1 = normalizeDate(date1, precision);
  const normDate2 = normalizeDate(date2, precision);

  return normDate1.getTime() === normDate2.getTime();
}
