import { isRecord } from './is-record';

describe('isRecord', () => {
  it('should return true if the value is a record', () => {
    const value = { foo: 'bar' };
    const result = isRecord(value);
    expect(result).toBe(true);
  });

  it('should return false if the value is not a record', () => {
    const value = 'test';
    const result = isRecord(value);
    expect(result).toBe(false);

    const value2 = new TestRecordClass();
    expect(isRecord(value2)).toBe(false);
  });

  it('should return false if the value is null', () => {
    const value = null;
    const result = isRecord(value);
    expect(result).toBe(false);
  });

  it('should return false if the value is undefined', () => {
    const value = undefined;
    const result = isRecord(value);
    expect(result).toBe(false);
  });
});

class TestRecordClass {
  private foo = '';
  constructor() {
    this.foo = 'bar';
  }
  public getFoo() {
    return this.foo;
  }
}
