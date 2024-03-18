import { humanizeMs } from './humanize-ms';

describe('humanizeMs', () => {
  it('should return years and years unit if the input is greater than or equal to 1 year', () => {
    expect(humanizeMs(31536000000, 0)).toEqual([1, 'year']);
    expect(humanizeMs(63072000000, 0)).toEqual([2, 'years']);
  });

  it('should return months and months unit if the input is greater than or equal to 1 month', () => {
    expect(humanizeMs(2592000000, 0)).toEqual([1, 'month']);
    expect(humanizeMs(5184000000, 0)).toEqual([2, 'months']);
  });

  it('should return weeks and weeks unit if the input is greater than or equal to 1 week', () => {
    expect(humanizeMs(604800000, 0)).toEqual([1, 'week']);
    expect(humanizeMs(1209600000, 0)).toEqual([2, 'weeks']);
  });

  it('should return days and days unit if the input is greater than or equal to 1 day', () => {
    expect(humanizeMs(86400000, 0)).toEqual([1, 'day']);
    expect(humanizeMs(172800000, 0)).toEqual([2, 'days']);
  });

  it('should return hours and hours unit if the input is greater than or equal to 1 hour', () => {
    expect(humanizeMs(3600000, 0)).toEqual([1, 'hour']);
    expect(humanizeMs(7200000, 0)).toEqual([2, 'hours']);
  });

  it('should return minutes and minutes unit if the input is greater than or equal to 1 minute', () => {
    expect(humanizeMs(60000, 0)).toEqual([1, 'minute']);
    expect(humanizeMs(120000, 0)).toEqual([2, 'minutes']);
  });

  it('should return seconds and seconds unit if the input is less than 1 minute', () => {
    expect(humanizeMs(1000, 0)).toEqual([1, 'second']);
    expect(humanizeMs(2000, 0)).toEqual([2, 'seconds']);
  });

  it('should return default values if ms is 0', () => {
    const result = humanizeMs(0);
    expect(result).toEqual(['0.0', 'seconds']);
  });

  it('should return correct decimal places', () => {
    const result = humanizeMs(6789, 3);
    expect(result).toEqual(['6.789', 'seconds']);
  });
});
