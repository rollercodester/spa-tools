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

  test('should be able to convert to hex without alpha', () => {
    const rgbaColor = 'rgba(255, 0, 0)';
    const color = parseColor(rgbaColor);
    expect(color.toHex()).toEqual('#ff0000');
  });

  test('should be able to convert to hex with alpha', () => {
    const rgbaColor = 'rgba(255, 0, 0, 0.5)';
    const color = parseColor(rgbaColor);
    expect(color.toHex()).toEqual('#ff000080');
  });

  test('should be able to convert to rgba', () => {
    const rgbaColor = 'rgba(255, 0, 0, 0.5)';
    const color = parseColor(rgbaColor);
    expect(color.toRgba()).toEqual('rgba(255, 0, 0, 0.5)');
  });

  test('should be able to convert to hsl', () => {
    const rgbaColor = 'rgba(255, 0, 0, 0.5)';
    const color = parseColor(rgbaColor);
    expect(color.toHsla()).toEqual('hsl(0, 100%, 50%, 0.5)');
  });

  test('hsl conversion should handle colors with euqal color values', () => {
    const rgbaColor = 'rgba(255, 255, 255, 0.5)';
    const color = parseColor(rgbaColor);
    expect(color.toHsla()).toEqual('hsl(0, 0%, 100%, 0.5)');
  });

  test('hsl conversion should handle colors with small difs', () => {
    const rgbaColor = 'rgba(255, 254, 253, 0.5)';
    const color = parseColor(rgbaColor);
    expect(color.toHsla()).toEqual('hsl(30, 100%, 100%, 0.5)');
  });

  test('hsl conversion should handle colors with dominant green', () => {
    const rgbaColor = 'rgba(200, 254, 253, 0.5)';
    const color = parseColor(rgbaColor);
    expect(color.toHsla()).toEqual('hsl(179, 96%, 89%, 0.5)');
  });

  test('hsl conversion should handle colors with dominant blue', () => {
    const rgbaColor = 'rgba(200, 200, 253, 0.5)';
    const color = parseColor(rgbaColor);
    expect(color.toHsla()).toEqual('hsl(240, 93%, 89%, 0.5)');
  });

  test('hsl conversion should handle when red is dominant and green less than blue', () => {
    const rgbaColor = 'rgba(255, 200, 220, 0.5)';
    const color = parseColor(rgbaColor);
    expect(color.toHsla()).toEqual('hsl(338, 100%, 89%, 0.5)');
  });
});
