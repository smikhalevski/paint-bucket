import {areEqualColors, isDark, toGrayscale} from '../main';
import {createRgb} from '@paint-bucket/core';

describe('toGrayscale', () => {

  test('converts color to grayscale', () => {
    expect(toGrayscale(createRgb())).toBe(createRgb());
    expect(toGrayscale(createRgb(0xFF, 0xFF, 0xFF))).toBe(createRgb(0xFF, 0xFF, 0xFF));
    expect(toGrayscale(createRgb(0x12, 0x34, 0x56))).toBe(createRgb(0x32, 0x32, 0x32));
  });

  test('preserves original alpha channel', () => {
    expect(toGrayscale(createRgb(0x12, 0x34, 0x56, 0.3))).toBe(createRgb(0x32, 0x32, 0x32, 0.3));
  });
});

describe('areEqualColors', () => {

  test('returns true if colors are exactly equal', () => {
    expect(areEqualColors(createRgb(0x12, 0x34, 0x56), createRgb(0x12, 0x34, 0x56))).toBe(true);
    expect(areEqualColors(createRgb(0xFF, 0xFF, 0xFF), createRgb())).toBe(false);
  });

  test('ignores alpha channel by default', () => {
    expect(areEqualColors(createRgb(0x12, 0x34, 0x56, 1), createRgb(0x12, 0x34, 0x56, 0))).toBe(true);
  });

  test('respects alpha channel', () => {
    expect(areEqualColors(createRgb(0x12, 0x34, 0x56, 1), createRgb(0x12, 0x34, 0x56, 0), false)).toBe(false);
  });
});

describe('isDark', () => {

  test('returns true if color is dark', () => {
    expect(isDark(createRgb())).toBe(true);
    expect(isDark(createRgb(0xFF, 0xFF, 0xFF))).toBe(false);
  });
});
