import { rgbaToHex } from './rgba-to-hex';

describe('rgbaToHex', () => {
  test('should convert a valid rgba color string to a hex color string', () => {
    const rgbaColor = 'rgba(255, 0, 0, 0.5)';
    const expectedHexColor = '#ff000080';
    expect(rgbaToHex(rgbaColor)).toEqual(expectedHexColor);
  });

  test('should handle invalid rgba color values', () => {
    const invalidRgbaColor = 'rgb(800, 800, 800)';
    const expectedHexColor = '#000000';
    expect(rgbaToHex(invalidRgbaColor)).toEqual(expectedHexColor);
  });

  test('should handle short rgba color lengths', () => {
    const invalidRgbaColor = 'rgb(255, 255)';
    const expectedHexColor = '#000000';
    expect(rgbaToHex(invalidRgbaColor)).toEqual(expectedHexColor);
  });

  test('should handle long rgba color lengths', () => {
    const invalidRgbaColor = 'rgb(255, 255, 255, 255, 255)';
    const expectedHexColor = '#000000';
    expect(rgbaToHex(invalidRgbaColor)).toEqual(expectedHexColor);
  });

  test('should handle invalid alpha', () => {
    const rgbaColor = 'rgba(255, 0, 0, 8.5)';
    const expectedHexColor = '#ff0000';
    expect(rgbaToHex(rgbaColor)).toEqual(expectedHexColor);
  });
});
