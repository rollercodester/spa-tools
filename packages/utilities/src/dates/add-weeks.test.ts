import { addWeeks } from './add-weeks';

describe('addWeeks', () => {
  test('should add the specified number of weeks to the date', () => {
    const date = new Date(2022, 0, 1); // January 1, 2022
    const weeks = 2;
    const expectedDate = new Date(2022, 0, 15); // January 15, 2022
    expect(addWeeks(date, weeks)).toEqual(expectedDate);
  });

  test('should handle negative number of weeks', () => {
    const date = new Date(2022, 0, 15); // January 15, 2022
    const weeks = -2;
    const expectedDate = new Date(2022, 0, 1); // January 1, 2022
    expect(addWeeks(date, weeks)).toEqual(expectedDate);
  });

  test('should handle zero number of weeks', () => {
    const date = new Date(2022, 0, 1); // January 1, 2022
    const weeks = 0;
    const expectedDate = new Date(2022, 0, 1); // January 1, 2022
    expect(addWeeks(date, weeks)).toEqual(expectedDate);
  });
});
