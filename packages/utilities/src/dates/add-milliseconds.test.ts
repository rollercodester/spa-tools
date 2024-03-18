import { addMilliseconds } from './add-milliseconds';

describe('addMilliseconds', () => {
  test('should add milliseconds to a date', () => {
    const date = new Date('2022-01-01T00:00:00Z');
    const milliseconds = 1000;
    const expectedDate = new Date('2022-01-01T00:00:01Z');
    expect(addMilliseconds(date, milliseconds)).toEqual(expectedDate);
  });

  test('should add negative milliseconds to a date', () => {
    const date = new Date('2022-01-01T00:00:01Z');
    const milliseconds = -1000;
    const expectedDate = new Date('2022-01-01T00:00:00Z');
    expect(addMilliseconds(date, milliseconds)).toEqual(expectedDate);
  });

  test('should add milliseconds to a date with milliseconds already set', () => {
    const date = new Date('2022-01-01T00:00:00.500Z');
    const milliseconds = 500;
    const expectedDate = new Date('2022-01-01T00:00:01.000Z');
    expect(addMilliseconds(date, milliseconds)).toEqual(expectedDate);
  });

  test('should add milliseconds to a date with milliseconds already set and negative milliseconds', () => {
    const date = new Date('2022-01-01T00:00:01.000Z');
    const milliseconds = -500;
    const expectedDate = new Date('2022-01-01T00:00:00.500Z');
    expect(addMilliseconds(date, milliseconds)).toEqual(expectedDate);
  });
});
