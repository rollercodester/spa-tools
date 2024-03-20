import { calculateUnitTime } from './utils';
import { roundToNearest } from '.';

/**
 * Converts a number of hours into the largest applicable unit of either year, month,
 * week, or day, returning a tuple of resulting number with requested decimal places
 * in first position and respective human-readable unit in second position.
 */
export function humanizeHrs(hours: number, decimalPlaces = 1) {
  const [years, yearsUnit, remainingYearHours] = calculateUnitTime(hours, 8760, 'year', decimalPlaces > 0);
  if (years) {
    if (decimalPlaces) {
      const normYears = roundToNearest(years + remainingYearHours / 8760, decimalPlaces);
      return [normYears, yearsUnit] as const;
    }
    return [years, yearsUnit] as const;
  }

  const [months, monthsUnit, remainingMonthHours] = calculateUnitTime(hours, 730, 'month', decimalPlaces > 0);
  if (months) {
    if (decimalPlaces) {
      const normMonths = roundToNearest(months + remainingMonthHours / 730, decimalPlaces);
      return [normMonths, monthsUnit] as const;
    }
    return [months, monthsUnit] as const;
  }

  const [weeks, weeksUnit, remainingWeekHours] = calculateUnitTime(hours, 168, 'week', decimalPlaces > 0);
  if (weeks) {
    if (decimalPlaces) {
      const normWeeks = roundToNearest(weeks + remainingWeekHours / 168, decimalPlaces);
      return [normWeeks, weeksUnit] as const;
    }
    return [weeks, weeksUnit] as const;
  }

  const [days, daysUnit, remainingDayHours] = calculateUnitTime(hours, 24, 'day', decimalPlaces > 0);
  const normDaysUnit = daysUnit || 'days';
  if (decimalPlaces) {
    const normDays = roundToNearest(days + remainingDayHours / 24, decimalPlaces);
    return [normDays, normDaysUnit] as const;
  }
  return [days, normDaysUnit] as const;
}
