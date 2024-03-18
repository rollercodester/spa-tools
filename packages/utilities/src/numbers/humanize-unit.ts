import { formatFloat } from './format-float';

/**
 * Humanizes a number utilizing a square-basis unit, returning a tuple of formatted number with requested
 * decimal places in first position and then respective human-readable unit in second position.
 *
 * By default, it will use the following units: K, M, B, T and a basis of 1000 with one decimal place.
 *
 * Example: To format file sizes, use units of ['KB', 'MB', 'GB', 'TB'] with a threshold of 1024.
 */
export function humanizeUnit(dividend: number, options?: HumanizeUnitOptions) {
  const { basis = 1000, decimalPlaces = 1, units = ['K', 'M', 'B', 'T'] } = options || {};
  const isNegative = dividend < 0;
  let normValue = Math.abs(dividend);
  let unitIndex = 0;

  while (normValue >= basis && ++unitIndex < units.length) {
    normValue /= basis;
  }

  const formattedValue = `${isNegative ? '-' : ''}${
    unitIndex === 0
      ? normValue.toString()
      : normValue % 1 === 0
        ? normValue.toString()
        : formatFloat(normValue, decimalPlaces, true)
  }`;

  const formattedUnit = unitIndex === 0 ? '' : units[unitIndex - 1];

  return [formattedValue, formattedUnit] as const;
}

export interface HumanizeUnitOptions {
  basis?: number;
  decimalPlaces?: number;
  units?: string[];
}
