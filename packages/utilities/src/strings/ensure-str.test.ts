import { ensureStr } from './ensure-str';

describe('ensureStr', () => {
  test('should return the string if it is not null or undefined', () => {
    const str = 'Hello, world!';
    const defaultValue = 'Default Value';
    const result = ensureStr(str, defaultValue);
    expect(result).toBe(str);
  });

  test('should return the string if it is empty', () => {
    const str = '';
    const defaultValue = 'Default Value';
    const result = ensureStr(str, defaultValue);
    expect(result).toBe(str);
  });

  test('should return the defaultValue if the string is null', () => {
    const str = null;
    const defaultValue = 'Default Value';
    const result = ensureStr(str, defaultValue);
    expect(result).toBe(defaultValue);
  });

  test('should return the defaultValue if the string is undefined', () => {
    const str = undefined;
    const defaultValue = 'Default Value';
    const result = ensureStr(str, defaultValue);
    expect(result).toBe(defaultValue);
  });
});
