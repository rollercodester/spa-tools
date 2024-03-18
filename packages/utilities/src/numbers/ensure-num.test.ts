import { ensureNum } from './ensure-num';

describe('ensureNum', () => {
  it('should return number for logical numbers', () => {
    expect(ensureNum(0, false)).toBe(0);
    expect(ensureNum(1, false)).toBe(1);
    expect(ensureNum(-1, false)).toBe(-1);
    expect(ensureNum(0.5, false)).toBe(0.5);
    expect(ensureNum(-0.5, false)).toBe(-0.5);
    expect(ensureNum('0', false)).toBe(0);
    expect(ensureNum('1', false)).toBe(1);
    expect(ensureNum('-1', false)).toBe(-1);
    expect(ensureNum('0.5', false)).toBe(0.5);
    expect(ensureNum('-0.5', false)).toBe(-0.5);
  });

  it('should return false for non-logical numbers', () => {
    expect(ensureNum(NaN, false)).toBe(false);
    expect(ensureNum(Infinity, false)).toBe(false);
    expect(ensureNum(-Infinity, false)).toBe(false);
    expect(ensureNum('abc', false)).toBe(false);
    expect(ensureNum(true, false)).toBe(false);
    expect(ensureNum(false, false)).toBe(false);
    expect(ensureNum(null, false)).toBe(false);
    expect(ensureNum(undefined, false)).toBe(false);
    expect(ensureNum({}, 'not number')).toBe('not number');
    expect(ensureNum([], false)).toBe(false);
    expect(ensureNum(() => {}, false)).toBe(false);
  });
});
