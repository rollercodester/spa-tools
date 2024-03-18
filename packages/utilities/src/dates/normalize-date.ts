import { DateInput, DatePrecision } from './types';

/**
 * Normalizes a date input of either string, number, or Date and returns a respective Date object.
 *
 * The precision parameter allows for the date to be normalized to the nearest hour, minute, second, or millisecond.
 */
export function normalizeDate(date: DateInput, precision: DatePrecision = 'millisecond') {
  let dateObj;

  if (date instanceof Date) {
    dateObj = date;
  } else {
    dateObj = new Date(date);
  }

  if (precision === 'hour') {
    dateObj.setMinutes(0, 0, 0);
  } else if (precision === 'minute') {
    dateObj.setSeconds(0, 0);
  } else if (precision === 'second') {
    dateObj.setMilliseconds(0);
  }

  return dateObj;
}
