import { ColorObject } from './color-object';
import { parseColor } from './parse-color';

describe('colorObject', () => {
  test('should be able to set the values', () => {
    const rgbaColor = 'rgba(255, 0, 0, 0.5)';
    const expectedColor = new ColorObject(0, 255, 120, 0.75);
    const color = parseColor(rgbaColor);
    color.red = 0;
    color.green = 255;
    color.blue = 120;
    color.alpha = 0.75;
    expect(color).toEqual(expectedColor);
  });

  test('should handle invalid values being set', () => {
    const rgbaColor = 'rgba(255, 0, 0, 0.5)';
    const color = parseColor(rgbaColor);
    color.red = NaN;
    color.green = NaN;
    color.blue = NaN;
    color.alpha = NaN;
    expect(color).toEqual(color);
  });

  test('should be able to access the color values', () => {
    const rgbaColor = 'rgba(255, 0, 0, 0.5)';
    const color = parseColor(rgbaColor);
    expect(color.red).toEqual(255);
    expect(color.green).toEqual(0);
    expect(color.blue).toEqual(0);
    expect(color.alpha).toEqual(0.5);
  });
});
