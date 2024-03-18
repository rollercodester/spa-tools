import { bytesToBase64 } from './bytes-to-base64';

describe('bytesToBase64', () => {
  test('should convert Uint8Array to base64 string', () => {
    const bytes = new Uint8Array([72, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100]); // ASCII values of "Hello world"
    const expectedBase64 = 'SGVsbG8gd29ybGQ='; // "Hello world" in base64

    const result = bytesToBase64(bytes);

    expect(result).toEqual(expectedBase64);
  });
});
