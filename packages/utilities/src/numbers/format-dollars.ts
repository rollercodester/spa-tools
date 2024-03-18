import { formatMoney } from './format-money';

/**
 * Format a number as USD and include dollar-sign by default with two decimal places.
 */
export function formatDollars(value: number | undefined, excludeSymbol = false, decimalPlaces = 2) {
  return formatMoney(value, 'USD', excludeSymbol, decimalPlaces);
}
