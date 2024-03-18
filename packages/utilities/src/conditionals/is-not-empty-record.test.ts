import { isNotEmptyRecord } from './is-not-empty-record';

describe('isNotEmptyRecord', () => {
  it('should return false for an empty record', () => {
    const record: Record<string, unknown> = {};
    expect(isNotEmptyRecord(record)).toBe(false);
    expect(isNotEmptyRecord({})).toBe(false);
  });

  it('should return true for a non-empty record', () => {
    const record: Record<string, unknown> = { key: 'value' };
    expect(isNotEmptyRecord(record)).toBe(true);
  });

  it('should return null for a non-record value', () => {
    expect(isNotEmptyRecord(null)).toBe(null);
    expect(isNotEmptyRecord(undefined)).toBe(null);
    expect(isNotEmptyRecord('')).toBe(null);
    expect(isNotEmptyRecord(0)).toBe(null);
    expect(isNotEmptyRecord(false)).toBe(null);
    expect(isNotEmptyRecord([])).toBe(null);
  });
});
