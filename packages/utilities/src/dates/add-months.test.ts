import { addMonths } from './add-months';

describe('addMonths', () => {
  test('should add positive months to a date', () => {
    const date = new Date(2022, 0, 1);
    const months = 3;
    const expectedDate = new Date(2022, 3, 1);
    expect(addMonths(date, months)).toEqual(expectedDate);
  });

  test('should add negative months to a date', () => {
    const date = new Date(2022, 0, 1);
    const months = -2;
    const expectedDate = new Date(2021, 10, 1);
    expect(addMonths(date, months)).toEqual(expectedDate);
  });

  test('should add zero months to a date', () => {
    const date = new Date(2022, 0, 1);
    const months = 0;
    const expectedDate = new Date(2022, 0, 1);
    expect(addMonths(date, months)).toEqual(expectedDate);
  });
});
