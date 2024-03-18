import { daysDiff } from './days-diff';

describe('daysDiff', () => {
  test('should return the correct number of days when dateA is before dateB', () => {
    const dateA = new Date('2022-01-01');
    const dateB = new Date('2022-01-10');
    const expectedDiff = 9;
    expect(daysDiff(dateA, dateB)).toEqual(expectedDiff);
  });

  test('should return the correct number of days when dateA is after dateB', () => {
    const dateA = new Date('2022-01-10');
    const dateB = new Date('2022-01-01');
    const expectedDiff = 9;
    expect(daysDiff(dateA, dateB)).toEqual(expectedDiff);
  });

  test('should return 0 when dateA and dateB are the same', () => {
    const dateA = new Date('2022-01-01');
    const dateB = new Date('2022-01-01');
    const expectedDiff = 0;
    expect(daysDiff(dateA, dateB)).toEqual(expectedDiff);
  });
});
