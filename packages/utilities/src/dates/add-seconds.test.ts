import { addSeconds } from './add-seconds';

describe('addSeconds', () => {
  it('should add the specified number of seconds to a given date', () => {
    const date = new Date('2022-01-01T00:00:00Z');
    const secondsToAdd = 60;
    const expectedDate = new Date('2022-01-01T00:01:00Z');
    const result = addSeconds(date, secondsToAdd);
    expect(result).toEqual(expectedDate);
  });

  test('should subtract seconds from a date', () => {
    const date = new Date('2022-01-01T00:00:00Z');
    const secondsToAdd = -60;
    const expectedDate = new Date('2021-12-31T23:59:00Z');
    const result = addSeconds(date, secondsToAdd);
    expect(result).toEqual(expectedDate);
  });

  test('should handle adding zero seconds', () => {
    const date = new Date('2022-01-01T00:00:00Z');
    const secondsToAdd = 0;
    const expectedDate = new Date('2022-01-01T00:00:00Z');
    const result = addSeconds(date, secondsToAdd);
    expect(result).toEqual(expectedDate);
  });
});
