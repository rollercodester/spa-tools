import { DEFAULT_RESULT_ON_ERROR, hexToRgba } from './hex-to-rgba';

describe('hexToRgba', () => {
  test('should convert a valid hex color to rgba', () => {
    const hexColor = '#FF0000';
    const expectedRgba = 'rgba(255, 0, 0, 1)';

    expect(hexToRgba(hexColor)).toEqual(expectedRgba);
  });

  test('should convert a valid hex color to rgba with custom opacity', () => {
    const hexColor = '#00FF00';
    const opacity = 0.5;
    const expectedRgba = 'rgba(0, 255, 0, 0.5)';

    expect(hexToRgba(hexColor, opacity)).toEqual(expectedRgba);
  });

  test('should handle invalid opacity values', () => {
    const hexColor = '#0000FF';
    const invalidOpacity = 1.5;
    const expectedColor = hexToRgba(hexColor, 1);
    expect(hexToRgba(hexColor, invalidOpacity)).toEqual(expectedColor);
  });

  test('should handle invalid hex color values', () => {
    const invalidHexColor = '#ZZZZZZ';
    expect(hexToRgba(invalidHexColor)).toEqual(DEFAULT_RESULT_ON_ERROR);
  });
});
