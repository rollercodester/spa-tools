import { base64ToBytes } from './base64-to-bytes';

describe('base64ToBytes', () => {
  test('should convert base64 string to Uint8Array', () => {
    const base64String = 'SGVsbG8gd29ybGQ='; // "Hello world" in base64
    const expectedBytes = new Uint8Array([72, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100]); // ASCII values of "Hello world"

    const result = base64ToBytes(base64String);

    expect(result).toEqual(expectedBytes);
  });
});
