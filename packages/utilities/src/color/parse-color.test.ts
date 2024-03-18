import { ColorObject } from './color-object';
import { parseColor } from './parse-color';

const expectedColorOnErr = new ColorObject(0, 0, 0, 1);

describe('parseColor', () => {
  test('should convert a valid rgba color string to a ColorObject', () => {
    const rgbaColor = 'rgba(255, 0, 0, 0.5)';
    const expectedColor = new ColorObject(255, 0, 0, 0.5);
    expect(parseColor(rgbaColor)).toEqual(expectedColor);
  });

  test('should convert a valid hex color string to a ColorObject', () => {
    const hexColor = '#00FF00';
    const expectedColor = new ColorObject(0, 255, 0, 1);
    expect(parseColor(hexColor)).toEqual(expectedColor);
  });

  test('should handle short hex color strings', () => {
    const shortHexColor = '#F00';
    const expectedColor = new ColorObject(255, 0, 0, 1);
    expect(parseColor(shortHexColor)).toEqual(expectedColor);
  });

  test('should handle short hex color strings with alpha', () => {
    const shortHexColor = '#FF08';
    const expectedColor = new ColorObject(255, 255, 0, 0.53);
    expect(parseColor(shortHexColor)).toEqual(expectedColor);
  });

  test('should handle converting to a hex color string', () => {
    const rgbaColor = 'rgba(255, 0, 0, 0.5)';
    const expectedColor = '#ff000080';
    expect(parseColor(rgbaColor).toHex()).toEqual(expectedColor);
  });

  test('should handle converting to a hex color string when alpha not provided', () => {
    const rgbaColor = 'rgba(255, 0, 0)';
    const expectedColor = '#ff0000';
    expect(parseColor(rgbaColor).toHex()).toEqual(expectedColor);
  });

  test('should handle converting to an rgba color string', () => {
    const hexColor = '#00FF00';
    const expectedColor = 'rgba(0, 255, 0, 1)';
    expect(parseColor(hexColor).toRgba()).toEqual(expectedColor);
  });

  test('should handle invalid rgba color values', () => {
    const invalidRgbaColor = 'rgb(800, 0, 0)';
    expect(parseColor(invalidRgbaColor)).toEqual(expectedColorOnErr);
  });

  test('should handle short rgba color lengths', () => {
    const invalidRgbaColor = 'rgb(255, 255)';
    expect(parseColor(invalidRgbaColor)).toEqual(expectedColorOnErr);
  });

  test('should handle long rgba color lengths', () => {
    const invalidRgbaColor = 'rgb(255, 255, 255, 255, 255)';
    expect(parseColor(invalidRgbaColor)).toEqual(expectedColorOnErr);
  });

  test('should handle invalid hex color values', () => {
    const invalidHexColor = '#ZZZZZZ';
    expect(parseColor(invalidHexColor)).toEqual(expectedColorOnErr);
  });

  test('should handle invalid hex color lengths', () => {
    const invalidHexColor1 = '#ZZZZZZAAAA';
    const invalidHexColor2 = '#ZZZZZZA';
    const invalidHexColor3 = '#ZZZZZ';
    const invalidHexColor4 = '#ZZ';

    expect(parseColor(invalidHexColor1)).toEqual(expectedColorOnErr);
    expect(parseColor(invalidHexColor2)).toEqual(expectedColorOnErr);
    expect(parseColor(invalidHexColor3)).toEqual(expectedColorOnErr);
    expect(parseColor(invalidHexColor4)).toEqual(expectedColorOnErr);
  });

  test('should handle invalid alpha', () => {
    const rgbaColor = 'rgba(255, 0, 0, 8.5)';
    const expectedColor = new ColorObject(255, 0, 0, 1);
    expect(parseColor(rgbaColor)).toEqual(expectedColor);
  });
});
