import { asStrategy } from './strategy';

describe('asStrategy', () => {
  it('should return the same object', () => {
    const input = { key: 'value' };
    const result = asStrategy()(input);

    expect(result).toBe(input);
  });

  it('should return the same object with a different type', () => {
    const input = { bar: 42, foo: 'hello' };
    const result = asStrategy<number | string>()(input);

    expect(result).toBe(input);
  });
});
