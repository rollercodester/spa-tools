import { parseColor } from './parse-color';
import { shade, tint, tone } from './shade-tint-tone';

describe('shade', () => {
  test('should shade a color by adding black', () => {
    const color = '#FF0000';
    const ratio = 0.5;
    const expectedColor = parseColor('#b40000');
    expect(shade(color, ratio)).toEqual(expectedColor);
  });

  test('should shade a color by adding black with alpha', () => {
    const color = '#FF000054';
    const ratio = 0.5;
    const expectedColor = parseColor('#b40000ab');
    expect(shade(color, ratio)).toEqual(expectedColor);
  });

  test('should shade a color by adding black with linear interpolation', () => {
    const color = '#FF0000';
    const ratio = 0.5;
    const useLinear = true;
    const expectedColor = parseColor('#800000');
    expect(shade(color, ratio, useLinear)).toEqual(expectedColor);
  });

  test('should shade a color by adding black with linear interpolation with alpha', () => {
    const color = '#FF000054';
    const ratio = 0.5;
    const useLinear = true;
    const expectedColor = parseColor('#800000ab');
    expect(shade(color, ratio, useLinear)).toEqual(expectedColor);
  });

  test('should shade a color by adding black with ratio of 1', () => {
    const color = '#FF0000';
    const ratio = 1;
    const expectedColor = parseColor('#000000');
    expect(shade(color, ratio)).toEqual(expectedColor);
  });

  test('should not shade a color given a ratio of 0', () => {
    const color = '#FF0000';
    const ratio = 0;
    const expectedColor = parseColor('#FF0000');
    expect(shade(color, ratio)).toEqual(expectedColor);
  });
});

describe('tint', () => {
  test('should tint a color by adding white', () => {
    const color = '#FF0000';
    const ratio = 0.2;
    const expectedColor = parseColor('#ff7272');
    expect(tint(color, ratio)).toEqual(expectedColor);
  });

  test('should tint a color by adding white with alpha', () => {
    const color = '#FF00008F';
    const ratio = 0.2;
    const expectedColor = parseColor('#ff7272a6');
    expect(tint(color, ratio)).toEqual(expectedColor);
  });

  test('should tint a color by adding white with linear interpolation', () => {
    const color = '#FF0000';
    const ratio = 0.2;
    const useLinear = true;
    const expectedColor = parseColor('#ff3333');
    expect(tint(color, ratio, useLinear)).toEqual(expectedColor);
  });

  test('should tint a color by adding white with linear interpolation with alpha', () => {
    const color = '#FF00008F';
    const ratio = 0.2;
    const useLinear = true;
    const expectedColor = parseColor('#ff3333a6');
    expect(tint(color, ratio, useLinear)).toEqual(expectedColor);
  });

  test('should tint a color by adding white with ratio of 1', () => {
    const color = '#FF0000';
    const ratio = 1;
    const expectedColor = parseColor('#FFFFFF');
    expect(tint(color, ratio)).toEqual(expectedColor);
  });

  test('should not tint a color given a ratio of 0', () => {
    const color = '#FF0000';
    const ratio = 0;
    const expectedColor = parseColor('#FF0000');
    expect(tint(color, ratio)).toEqual(expectedColor);
  });
});

describe('tone', () => {
  test('should tone a color by adding gray', () => {
    const color = '#FF0000';
    const ratio = 0.2;
    const expectedColor = parseColor('#eb3939');
    expect(tone(color, ratio)).toEqual(expectedColor);
  });

  test('should tone a color by adding gray with alpha', () => {
    const color = '#FF000026';
    const ratio = 0.2;
    const expectedColor = parseColor('#eb393952');
    expect(tone(color, ratio)).toEqual(expectedColor);
  });

  test('should tone a color by adding gray with linear interpolation', () => {
    const color = '#FF0000';
    const ratio = 0.2;
    const useLinear = true;
    const expectedColor = parseColor('#e61a1a');
    expect(tone(color, ratio, useLinear)).toEqual(expectedColor);
  });

  test('should tone a color by adding gray with linear interpolation with alpha', () => {
    const color = '#FF000026';
    const ratio = 0.2;
    const useLinear = true;
    const expectedColor = parseColor('#e61a1a52');
    expect(tone(color, ratio, useLinear)).toEqual(expectedColor);
  });

  test('should tone a color by adding gray with ratio of 1', () => {
    const color = '#FF0000';
    const ratio = 1;
    const expectedColor = parseColor('#808080');
    expect(tone(color, ratio)).toEqual(expectedColor);
  });

  test('should not tone a color given a ratio of 0', () => {
    const color = '#FF0000';
    const ratio = 0;
    const expectedColor = parseColor('#FF0000');
    expect(tone(color, ratio)).toEqual(expectedColor);
  });
});
