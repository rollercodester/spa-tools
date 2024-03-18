/**
 * Format a number as a currency.
 *
 * By default, it will use two decimal places and the US locale and include currency symbol.
 */
export function formatMoney(value: number | undefined, currency: string, excludeSymbol = false, decimalPlaces = 2) {
  if (value === undefined) {
    return '';
  }

  return new Intl.NumberFormat('en-US', {
    currency,
    maximumFractionDigits: decimalPlaces,
    minimumFractionDigits: decimalPlaces,
    style: excludeSymbol ? 'decimal' : 'currency',
  }).format(value);
}
