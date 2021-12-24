import {
  blackHsl,
  blackRgb,
  hsl,
  isDark,
  isEqualColor,
  isHsl,
  isRgb,
  rgb,
  convertColorSpace,
  toGrayscale,
  whiteHsl,
  whiteRgb,
} from '../main/color-space-utils';
import {ColorSpace} from '../main/colors/color-types';


describe('convertColorSpace', () => {

  test('converts RGB to RGB', () => {
    expect(convertColorSpace(blackRgb, ColorSpace.RGB)).toBe(blackRgb);
    expect(convertColorSpace(rgb(0x7F, 0x7F, 0x7F), ColorSpace.RGB)).toBe(rgb(0x7F, 0x7F, 0x7F));
    expect(convertColorSpace(rgb(0x12, 0x34, 0x56), ColorSpace.RGB)).toBe(rgb(0x12, 0x34, 0x56));
  });

  // test('converts RGB to HSL', () => {
  //   expect(convertColorSpace(blackRgb, ColorSpace.HSL)).toBe(hsl(0, 0, 0));
  //   expect(convertColorSpace(rgb(0x7F, 0x7F, 0x7F), ColorSpace.HSL)).toBe(hsl(0, 0, 0x7F));
  //   expect(convertColorSpace(rgb(0x12, 0x34, 0x56), ColorSpace.HSL)).toBe(hsl(0x94, 0xA6, 0x34));
  // });

  test('converts HSL to HSL', () => {
    expect(convertColorSpace(blackHsl, ColorSpace.HSL)).toBe(blackHsl);
    expect(convertColorSpace(hsl(0x7F, 0x7F, 0x7F), ColorSpace.HSL)).toBe(hsl(0x7F, 0x7F, 0x7F));
    expect(convertColorSpace(hsl(0x12, 0x34, 0x56), ColorSpace.HSL)).toBe(hsl(0x12, 0x34, 0x56));
  });

  // test('converts HSL to RGB', () => {
  //   expect(convertColorSpace(blackHsl, ColorSpace.RGB)).toBe(rgb(0, 0, 0));
  //   expect(convertColorSpace(hsl(0, 0, 0x7F), ColorSpace.RGB)).toBe(rgb(0x7F, 0x7F, 0x7F));
  //
  //   // heavy rounding error
  //   expect(convertColorSpace(hsl(0x94, 0xA6, 0x34), ColorSpace.RGB)).toBe(rgb(0x12, 0x35, 0x55));
  // });

  test('returns -1 for unknown color model', () => {
    expect(convertColorSpace(0x33, ColorSpace.RGB)).toBe(-1);
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
