/**
 * Format the quotient of two numbers.
 *
 * By default, it will return a quotient in millions and use zero decimal places and use grouping.
 *
 * Example: `formatQuotient(2500000, { divisor: 10 })` returns `250,000`.
 */
export function formatQuotient(dividend: number, options?: FormatQuotientOptions): string {
  const { decimalPlaces = 0, divisor = 1000000, unit = '', useGrouping = true } = options || {};
  return (
    (dividend / divisor).toLocaleString(undefined, {
      maximumFractionDigits: decimalPlaces,
      minimumFractionDigits: decimalPlaces,
      useGrouping,
    }) + unit
  );
}

export interface FormatQuotientOptions {
  decimalPlaces?: number;
  divisor?: number;
  unit?: string;
  useGrouping?: boolean;
}
