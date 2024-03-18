import { normalizeError } from './normalize-error';

describe('normalizeError', () => {
  it('should return the same error instance if the input is an instance of Error', () => {
    const error = new Error('Test error');
    const result = normalizeError(error);
    expect(result).toBe(error);
  });

  it('should return a new Error instance with the JSON stringified error if the input is not an instance of Error', () => {
    const error = { message: 'Test error' };
    const result = normalizeError(error);
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe(JSON.stringify(error));
  });
});
