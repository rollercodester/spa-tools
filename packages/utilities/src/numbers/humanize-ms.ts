import { calculateUnitTime } from './utils';
import { roundToNearest } from '.';

/**
 * Converts a number of milliseconds into the largest applicable unit of either year, month,
 * week, day, hour, minute or second, returning a tuple of resulting number with requested
 * decimal places in first position and respective human-readable unit in second position.
 */
export function humanizeMs(ms: number, decimalPlaces = 1) {
  const [years, yearsUnit, remainingYearMs] = calculateUnitTime(ms, 31536000000, 'year', decimalPlaces > 0);
  if (years) {
    if (decimalPlaces) {
      const normYears = roundToNearest(years + remainingYearMs / 31536000000, decimalPlaces);
      return [normYears, yearsUnit] as const;
    }
    return [years, yearsUnit] as const;
  }

  const [months, monthsUnit, remainingMonthMs] = calculateUnitTime(ms, 2592000000, 'month', decimalPlaces > 0);
  if (months) {
    if (decimalPlaces) {
      const normMonths = roundToNearest(months + remainingMonthMs / 2592000000, decimalPlaces);
      return [normMonths, monthsUnit] as const;
    }
    return [months, monthsUnit] as const;
  }

  const [weeks, weeksUnit, remainingWeekMs] = calculateUnitTime(ms, 604800000, 'week', decimalPlaces > 0);
  if (weeks) {
    if (decimalPlaces) {
      const normWeeks = roundToNearest(weeks + remainingWeekMs / 604800000, decimalPlaces);
      return [normWeeks, weeksUnit] as const;
    }
    return [weeks, weeksUnit] as const;
  }

  const [days, daysUnit, remainingDayMs] = calculateUnitTime(ms, 86400000, 'day', decimalPlaces > 0);
  if (days) {
    if (decimalPlaces) {
      const normDays = roundToNearest(days + remainingDayMs / 86400000, decimalPlaces);
      return [normDays, daysUnit] as const;
    }
    return [days, daysUnit] as const;
  }

  const [hours, hoursUnit, remainingHourMs] = calculateUnitTime(ms, 3600000, 'hour', decimalPlaces > 0);
  if (hours) {
    if (decimalPlaces) {
      const normHours = roundToNearest(hours + remainingHourMs / 3600000, decimalPlaces);
      return [normHours, hoursUnit] as const;
    }
    return [hours, hoursUnit] as const;
  }

  const [minutes, minutesUnit, remainingMinuteMs] = calculateUnitTime(ms, 60000, 'minute', decimalPlaces > 0);
  if (minutes) {
    if (decimalPlaces) {
      const normMinutes = roundToNearest(minutes + remainingMinuteMs / 60000, decimalPlaces);
      return [normMinutes, minutesUnit] as const;
    }
    return [minutes, minutesUnit] as const;
  }

  const [seconds, secondsUnit, remainingSecondMs] = calculateUnitTime(ms, 1000, 'second', decimalPlaces > 0);
  const normSecondsUnit = secondsUnit || 'seconds';
  if (decimalPlaces) {
    const normSeconds = roundToNearest(seconds + remainingSecondMs / 1000, decimalPlaces);
    return [normSeconds, normSecondsUnit] as const;
  }
  return [seconds, normSecondsUnit] as const;
}
