import { looksLikeBase64 } from './looks-like-base64';

describe('looksLikeBase64', () => {
  test('should return true for valid base64 strings', () => {
    expect(looksLikeBase64('SGVsbG8gd29ybGQh')).toBe(true);
    expect(looksLikeBase64('VGhpcyBpcyBhIGJhc2U2NCBzdHJpbmc=')).toBe(true);
    expect(looksLikeBase64('YW55IGNhcm5hbCBwbGVhc3VyZS4=')).toBe(true);
  });

  test('should return false for invalid base64 strings', () => {
    expect(looksLikeBase64('Hello world!')).toBe(false);
    expect(looksLikeBase64('This is not a base64 string')).toBe(false);
    expect(looksLikeBase64('Invalid base64 string')).toBe(false);
  });
});
