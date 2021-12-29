import {color} from '@paint-bucket/core';
import '../main';

describe('rgb', () => {

  test('creates color from object', () => {
    expect(color.rgb({R: 128, G: 128, B: 128, a: 0.5}).toRgb()).toEqual({
      R: 128,
      G: 128,
      B: 128,
      a: 0.5,
    });
  });

  test('clamps component values', () => {
    expect(color.rgb({R: 1000, G: -1000, B: 256, a: 2}).toRgb()).toEqual({
      R: 255,
      G: 0,
      B: 255,
      a: 1,
    });
  });
});

describe('rgb24', () => {

  test('creates color from 24-bit integer', () => {
    expect(color.rgb24(0xFF_FF_FF, 0.5).toRgb()).toEqual({
      R: 255,
      G: 255,
      B: 255,
      a: 0.5,
    });
  });
});

// describe('toRgb', () => {
//
//   test('creates color from object', () => {
//     expect(color({R: 0.5, a: 0.5}).toRgb()).toEqual({
//       R: 0.5,
//       G: 0,
//       B: 0,
//       a: 0.5,
//     });
//   });
// });

/*test('creates color from integer', () => {
  expect(color(0xFA_80_72_FF).toRgb()).toEqual({
    R: 0.9803921568627451,
    G: 0.5019607843137255,
    B: 0.4470588235294118,
    a: 1,
  });
});

test('creates color from integer with nibble count', () => {
  expect(color(0xABC, 3).toRgb()).toEqual({
    R: 0.6666666666666666,
    G: 0.7333333333333333,
    B: 0.8,
    a: 1,
  });
});

test('sets color from object', () => {
  expect(color().setRgb({R: 0.5, a: 0.5}).toRgb()).toEqual({
    R: 0.5,
    G: 0,
    B: 0,
    a: 0.5,
  });
});

test('sets color from object with values bound to 255', () => {
  expect(color().setRgb255({R: 128, a: 0.5}).toRgb()).toEqual({
    R: 0.5019607843137255,
    G: 0,
    B: 0,
    a: 0.5,
  });
});

test('sets color from integer', () => {
  expect(color().setRgbInt(0xFA_80_72_FF).toRgb()).toEqual({
    R: 0.9803921568627451,
    G: 0.5019607843137255,
    B: 0.4470588235294118,
    a: 1,
  });
});

test('sets color from integer with nibble count', () => {
  expect(color().setRgbInt(0xABC, 3).toRgb()).toEqual({
    R: 0.6666666666666666,
    G: 0.7333333333333333,
    B: 0.8,
    a: 1,
  });
});

test('returns red color component', () => {
  expect(color(0xFA_80_72_FF).getRed()).toBeCloseTo(0.9803);
});

test('sets red color component', () => {
  expect(color(0xFA_80_72_FF).setRed(0.5).getRed()).toBe(0.5);
});

test('returns green color component', () => {
  expect(color(0xFA_80_72_FF).getGreen()).toBeCloseTo(0.5019);
});

test('sets green color component', () => {
  expect(color(0xFA_80_72_FF).setGreen(0.5).getGreen()).toBe(0.5);
});

test('returns blue color component', () => {
  expect(color(0xFA_80_72_FF).getBlue()).toBeCloseTo(0.4470);
});

test('sets blue color component', () => {
  expect(color(0xFA_80_72_FF).setBlue(0.5).getBlue()).toBe(0.5);
});

test('returns alpha color component', () => {
  expect(color(0xFF_FF_FF_DD_FF).getAlpha()).toBeCloseTo(0.8666);
});

test('sets alpha color component', () => {
  expect(color(0xFF_FF_FF_DD_FF).setAlpha(0.5).getAlpha()).toBe(0.5);
});

test('returns brightness', () => {
  expect(color(0x00_00_00_FF).getBrightness()).toBe(0);
  expect(color(0xFF_FF_FF_FF).getBrightness()).toBeCloseTo(1);
  expect(color(0xFA_80_72_FF).getBrightness()).toBeCloseTo(0.6387);
});

test('returns luminance', () => {
  expect(color(0x00_00_00_FF).getLuminance()).toBe(0);
  expect(color(0xFF_FF_FF_FF).getLuminance()).toBeCloseTo(1);
  expect(color(0xFA_80_72_FF).getLuminance()).toBeCloseTo(0.3697);
});

test('checks color darkness', () => {
  expect(color(0x00_00_00_FF).isDark()).toBe(true);
  expect(color(0xFF_FF_FF_FF).isDark()).toBe(false);
});

test('checks color lightness', () => {
  expect(color(0x00_00_00_FF).isLight()).toBe(false);
  expect(color(0xFF_FF_FF_FF).isLight()).toBe(true);
});

test('compares colors', () => {
  expect(color(0x00_00_00_FF, 8).isEqual(color(0x00_00_00_00, 0))).toBe(false);
  expect(color(0x00_00_00_FF, 8).isEqual(color(0x00_00_00_00, 0), true)).toBe(true);
  expect(color(0x00_00_00_FF).isEqual(color(0x00_00_AA_FF))).toBe(false);
  expect(color(0x00_00_00_FF).isEqual(color(0x00_00_00_FF))).toBe(true);
  expect(color(0x00_00_00_FF).isEqual(color({R: 0.0001}))).toBe(true);
});

test('returns readability', () => {
  expect(color(0x00_00_00_FF).readability(color(0x00_00_00_FF))).toBe(1);
  expect(color(0x00_00_00_FF).readability(color(0xFF_FF_FF_FF))).toBe(21);
});

test('returns readability status', () => {
  expect(color(0x00_00_00_FF).isReadable(color(0x00_00_00_FF))).toBe(false);
  expect(color(0x00_00_00_FF).isReadable(color(0xFF_FF_FF_FF))).toBe(true);
});

test('mixes colors', () => {
  expect(color(0x00_00_00_FF).mix(color(0xFF_FF_FF_FF), 0.5).toRgb()).toEqual({
    R: 0.5,
    G: 0.5,
    B: 0.5,
    a: 1,
  });
});

test('converts color to grayscale', () => {
  expect(color(0xFA_80_72_FF).greyscale().toRgb()).toEqual({
    R: 0.6768138032427382,
    G: 0.6768138032427382,
    B: 0.6768138032427382,
    a: 1,
  });
});

test('returns integer color representation', () => {
  expect(color(0xFA_80_72_FF).toRgbInt()).toBe(0xFA_80_72_FF);
});*/
