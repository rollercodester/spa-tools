import { humanizeHrs } from './humanize-hrs';

describe('humanizeHrs', () => {
  it('should return years and years unit if hours is greater than or equal to HOURS_IN_YEAR', () => {
    const hours = 8760; // 1 year

    const result = humanizeHrs(hours, 0);

    expect(result).toEqual([1, 'year']);
  });

  it('should return months and months unit if hours is greater than or equal to HOURS_IN_MONTH', () => {
    const hours = 730; // 1 month

    const result = humanizeHrs(hours, 0);

    expect(result).toEqual([1, 'month']);
  });

  it('should return weeks and weeks unit if hours is greater than or equal to HOURS_IN_WEEK', () => {
    const hours = 168; // 1 week

    const result = humanizeHrs(hours, 0);

    expect(result).toEqual([1, 'week']);
  });

  it('should return days and days unit if hours is less than HOURS_IN_WEEK', () => {
    const hours = 24; // 1 day

    const result = humanizeHrs(hours, 0);

    expect(result).toEqual([1, 'day']);
  });

  it('should return days unit if hours is between HOURS_IN_DAY and HOURS_IN_WEEK', () => {
    const hours = 48; // 2 days

    const result = humanizeHrs(hours, 0);

    expect(result).toEqual([2, 'days']);
  });

  it('should return month unit if hours is between HOURS_IN_MONTH and HOURS_IN_YEAR', () => {
    const hours = 744; // 31 days

    const result = humanizeHrs(hours, 0);

    expect(result).toEqual([1, 'month']);
  });

  it('should return default values if hours is 0', () => {
    const hours = 0;

    const result = humanizeHrs(hours);

    expect(result).toEqual(['0.0', 'days']);
  });

  it('should return correct decimal places', () => {
    const hours = 888;

    const result = humanizeHrs(hours, 3);

    expect(result).toEqual(['1.216', 'months']);
  });
});
