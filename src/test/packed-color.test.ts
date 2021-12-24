import {composeBytes, fromNakedColor, getColorByte, getColorSpace, NibbleCount, setColorByte} from '../main/raw-color-utils';
import {ColorSpace} from '../main/colors/color-types';

describe('fromNakedColor', () => {

  test('normalizes raw color bytes', () => {
    expect(fromNakedColor(ColorSpace.HSL, 0x1, 1)).toBe(0x11_11_11_FF_1);
    expect(fromNakedColor(ColorSpace.HSL, 0x12, 2)).toBe(0x12_12_12_FF_1);
    expect(fromNakedColor(ColorSpace.HSL, 0x123, 3)).toBe(0x11_22_33_FF_1);
    expect(fromNakedColor(ColorSpace.HSL, 0x1234, 4)).toBe(0x11_22_33_44_1);
    expect(fromNakedColor(ColorSpace.HSL, 0x123456, 6)).toBe(0x12_34_56_FF_1);
    expect(fromNakedColor(ColorSpace.HSL, 0x12345678, 8)).toBe(0x12_34_56_78_1);
  });

  test('returns black for invalid nibble count', () => {
    expect(fromNakedColor(ColorSpace.RGB, 0x123, 0 as NibbleCount)).toBe(0);

    expect(fromNakedColor(ColorSpace.HSL, 0x123, 0 as NibbleCount)).toBe(1);
    expect(fromNakedColor(ColorSpace.HSL, 0x12345, 5 as NibbleCount)).toBe(1);
    expect(fromNakedColor(ColorSpace.HSL, 0x1234567, 7 as NibbleCount)).toBe(1);
    expect(fromNakedColor(ColorSpace.HSL, 0x123456789A, 10 as NibbleCount)).toBe(1);
  });
});

describe('composeBytes', () => {

  test('assembles color from bytes', () => {
    expect(composeBytes(ColorSpace.RGB, 0x12, 0x34, 0x56, 0x78)).toBe(0x123456780);
  });

  test('clamps bytes', () => {
    expect(composeBytes(ColorSpace.RGB, 0x12, 0xAA_34, 0x56, 0xAA_78)).toBe(0x12FF56FF0);
  });
});

describe('getColorSpace', () => {

  test('gets the color space', () => {
    expect(getColorSpace(0x12_34_56_AA_1)).toBe(0x1);
    expect(getColorSpace(0x12_34_56_AA_C)).toBe(0xC);
  });
});

describe('getColorByte', () => {

  test('gets the color byte', () => {
    const color = 0x12_34_56_AA_0;

    expect(getColorByte(color, 0)).toBe(0x12);
    expect(getColorByte(color, 1)).toBe(0x34);
    expect(getColorByte(color, 2)).toBe(0x56);
    expect(getColorByte(color, 3)).toBe(0xAA);
  });
});

describe('setColorByte', () => {

  test('sets the color byte', () => {
    expect(setColorByte(0x12_34_56_78_0, 0, 0xAA)).toBe(0xAA_34_56_78_0);
    expect(setColorByte(0x12_34_56_78_0, 1, 0xAA)).toBe(0x12_AA_56_78_0);
    expect(setColorByte(0x12_34_56_78_0, 2, 0xAA)).toBe(0x12_34_AA_78_0);
    expect(setColorByte(0x12_34_56_78_0, 3, 0xAA)).toBe(0x12_34_56_AA_0);

    expect(setColorByte(0x12_34_56_78_0, 0, 0xA)).toBe(0x0A_34_56_78_0);
    expect(setColorByte(0x12_34_56_78_0, 1, 0xA)).toBe(0x12_0A_56_78_0);
    expect(setColorByte(0x12_34_56_78_0, 2, 0xA)).toBe(0x12_34_0A_78_0);
    expect(setColorByte(0x12_34_56_78_0, 3, 0xA)).toBe(0x12_34_56_0A_0);

    expect(setColorByte(0x12_34_56_78_0, 0, 0xA0)).toBe(0xA0_34_56_78_0);
    expect(setColorByte(0x12_34_56_78_0, 1, 0xA0)).toBe(0x12_A0_56_78_0);
    expect(setColorByte(0x12_34_56_78_0, 2, 0xA0)).toBe(0x12_34_A0_78_0);
    expect(setColorByte(0x12_34_56_78_0, 3, 0xA0)).toBe(0x12_34_56_A0_0);
  });

  test('prevents overflow', () => {
    expect(setColorByte(0x12_34_56_78_0, 0, 0xAA_BB)).toBe(0xFF_34_56_78_0);
    expect(setColorByte(0x12_34_56_78_0, 1, 0xAA_BB)).toBe(0x12_FF_56_78_0);
    expect(setColorByte(0x12_34_56_78_0, 2, 0xAA_BB)).toBe(0x12_34_FF_78_0);
    expect(setColorByte(0x12_34_56_78_0, 3, 0xAA_BB)).toBe(0x12_34_56_FF_0);
  });
});
