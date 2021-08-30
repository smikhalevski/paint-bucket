import {
  blackHsl,
  blackRgb,
  hsl,
  isDark,
  isEqualColor,
  isHsl,
  isRgb,
  rgb,
  toColorModel,
  toGrayscale,
  whiteHsl,
  whiteRgb,
} from '../main/colors';
import {ColorModel} from '../main/bytes';

describe('rgb', () => {

  test('creates RGB color', () => {
    expect(rgb(0x12, 0x34, 0x56)).toBe(0x12_34_56_FF_00);
  });

  test('creates RGBa color', () => {
    expect(rgb(0x12, 0x34, 0x56, 0.5)).toBe(0x12_34_56_7F_00);
  });

  test('clamps bytes', () => {
    expect(rgb(0xAA_12, 0x34, 0xAA_56, 100)).toBe(0xFF_34_FF_FF_00);
  });
});

describe('hsl', () => {

  test('creates HSL color', () => {
    expect(hsl(0x12, 0x34, 0x56)).toBe(0x12_34_56_FF_01);
  });

  test('creates HSLa color', () => {
    expect(hsl(0x12, 0x34, 0x56, 0.5)).toBe(0x12_34_56_7F_01);
  });

  test('clamps bytes', () => {
    expect(hsl(0xAA_12, 0x34, 0xAA_56, 100)).toBe(0xFF_34_FF_FF_01);
  });
});

describe('isRgb', () => {

  test('returns true if color has RGB model', () => {
    expect(isRgb(rgb(0x12, 0x34, 0x56))).toBe(true);
    expect(isRgb(hsl(0x12, 0x34, 0x56))).toBe(false);
  });
});

describe('isHsl', () => {

  test('returns true if color has HSL model', () => {
    expect(isHsl(hsl(0x12, 0x34, 0x56))).toBe(true);
    expect(isHsl(rgb(0x12, 0x34, 0x56))).toBe(false);
  });
});

describe('toColorModel', () => {

  test('converts RGB to RGB', () => {
    expect(toColorModel(blackRgb, ColorModel.RGB)).toBe(blackRgb);
    expect(toColorModel(rgb(0x7F, 0x7F, 0x7F), ColorModel.RGB)).toBe(rgb(0x7F, 0x7F, 0x7F));
    expect(toColorModel(rgb(0x12, 0x34, 0x56), ColorModel.RGB)).toBe(rgb(0x12, 0x34, 0x56));
  });

  test('converts RGB to HSL', () => {
    expect(toColorModel(blackRgb, ColorModel.HSL)).toBe(hsl(0, 0, 0));
    expect(toColorModel(rgb(0x7F, 0x7F, 0x7F), ColorModel.HSL)).toBe(hsl(0, 0, 0x7F));
    expect(toColorModel(rgb(0x12, 0x34, 0x56), ColorModel.HSL)).toBe(hsl(0x94, 0xA6, 0x34));
  });

  test('converts HSL to HSL', () => {
    expect(toColorModel(blackHsl, ColorModel.HSL)).toBe(blackHsl);
    expect(toColorModel(hsl(0x7F, 0x7F, 0x7F), ColorModel.HSL)).toBe(hsl(0x7F, 0x7F, 0x7F));
    expect(toColorModel(hsl(0x12, 0x34, 0x56), ColorModel.HSL)).toBe(hsl(0x12, 0x34, 0x56));
  });

  test('converts HSL to RGB', () => {
    expect(toColorModel(blackHsl, ColorModel.RGB)).toBe(rgb(0, 0, 0));
    expect(toColorModel(hsl(0, 0, 0x7F), ColorModel.RGB)).toBe(rgb(0x7F, 0x7F, 0x7F));

    // heavy rounding error
    expect(toColorModel(hsl(0x94, 0xA6, 0x34), ColorModel.RGB)).toBe(rgb(0x12, 0x35, 0x55));
  });

  test('returns -1 for unknown color model', () => {
    expect(toColorModel(0x33, ColorModel.RGB)).toBe(-1);
  });
});

describe('isEqualColor', () => {

  test('returns true if colors are exactly equal', () => {
    expect(isEqualColor(rgb(0x12, 0x34, 0x56), rgb(0x12, 0x34, 0x56))).toBe(true);
    expect(isEqualColor(whiteRgb, blackRgb)).toBe(false);
  });

  test('compares colors with different color models', () => {
    expect(isEqualColor(rgb(0x12, 0x35, 0x55), hsl(0x94, 0xA6, 0x34))).toBe(true);
    expect(isEqualColor(blackHsl, blackRgb)).toBe(true);
  });

  test('ignores alpha channel by default', () => {
    expect(isEqualColor(rgb(0x12, 0x34, 0x56, 1), rgb(0x12, 0x34, 0x56, 0))).toBe(true);
  });

  test('respects alpha channel', () => {
    expect(isEqualColor(rgb(0x12, 0x34, 0x56, 1), rgb(0x12, 0x34, 0x56, 0), false)).toBe(false);
  });
});

describe('toGrayscale', () => {

  test('converts color to grayscale', () => {
    expect(toGrayscale(blackRgb)).toBe(blackRgb);
    expect(toGrayscale(whiteRgb)).toBe(whiteRgb);
    expect(toGrayscale(rgb(0x12, 0x34, 0x56))).toBe(rgb(0x32, 0x32, 0x32));
  });

  test('preserves original color model', () => {
    expect(toGrayscale(blackHsl)).toBe(blackHsl);
    expect(toGrayscale(whiteHsl)).toBe(whiteHsl);
    expect(toGrayscale(hsl(0x12, 0x34, 0x56))).toBe(hsl(0, 0, 0x57));
  });

  test('preserves original alpha channel', () => {
    expect(toGrayscale(rgb(0x12, 0x34, 0x56, 0.3))).toBe(rgb(0x32, 0x32, 0x32, 0.3));
  });
});

describe('isDark', () => {

  test('returns true if color is dark', () => {
    expect(isDark(blackRgb)).toBe(true);
    expect(isDark(whiteRgb)).toBe(false);
  });

  test('supports any color model', () => {
    expect(isDark(blackHsl)).toBe(true);
    expect(isDark(whiteHsl)).toBe(false);
  });
});
