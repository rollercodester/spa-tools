/**
 * Formats a number as a float with the specified number of decimal places.
 *
 * By default, it will use two decimal places and the US locale and group numbers.
 *
 * If `parentheticalNegatives` is true, negative numbers will be wrapped in parentheses.
 */
export function formatFloat(value: number, decimalPlaces = 2, useGrouping = true, parentheticalNegatives = false) {
  if (!parentheticalNegatives) {
    //
    // EARLY RETURN - no parenthetical negatives
    //
    return Intl.NumberFormat('en-US', {
      maximumFractionDigits: decimalPlaces,
      minimumFractionDigits: decimalPlaces,
      useGrouping,
    }).format(value);
  }

  const posValue = Math.abs(value);
  const posFormat = Intl.NumberFormat('en-US', {
    maximumFractionDigits: decimalPlaces,
    minimumFractionDigits: decimalPlaces,
    useGrouping,
  }).format(posValue);

  return value < 0 ? `(${posFormat})` : posFormat;
}
