import {
  ColorModel,
  fromBytes,
  fromRawColor,
  getColorByte,
  getColorFloat,
  getColorModel,
  NibbleCount,
  setColorByte,
} from '../main/bytes';

describe('fromRawColor', () => {

  test('normalizes raw color bytes', () => {
    expect(fromRawColor(ColorModel.HSL, 0x1, 1)).toBe(0x11_11_11_FF_01);
    expect(fromRawColor(ColorModel.HSL, 0x12, 2)).toBe(0x12_12_12_FF_01);
    expect(fromRawColor(ColorModel.HSL, 0x123, 3)).toBe(0x11_22_33_FF_01);
    expect(fromRawColor(ColorModel.HSL, 0x1234, 4)).toBe(0x11_22_33_44_01);
    expect(fromRawColor(ColorModel.HSL, 0x123456, 6)).toBe(0x12_34_56_FF_01);
    expect(fromRawColor(ColorModel.HSL, 0x12345678, 8)).toBe(0x12_34_56_78_01);
  });

  test('returns -1 for invalid nibble count', () => {
    expect(fromRawColor(ColorModel.HSL, 0x123, 0 as NibbleCount)).toBe(-1);
    expect(fromRawColor(ColorModel.HSL, 0x12345, 5 as NibbleCount)).toBe(-1);
    expect(fromRawColor(ColorModel.HSL, 0x1234567, 7 as NibbleCount)).toBe(-1);
    expect(fromRawColor(ColorModel.HSL, 0x123456789A, 10 as NibbleCount)).toBe(-1);
  });
});

describe('fromBytes', () => {

  test('assembles color from bytes', () => {
    expect(fromBytes(ColorModel.RGB, 0x12, 0x34, 0x56, 0x78)).toBe(0x1234567800);
  });

  test('clamps bytes', () => {
    expect(fromBytes(ColorModel.RGB, 0x12, 0xAA_34, 0x56, 0xAA_78)).toBe(0x12FF56FF00);
  });
});

describe('getColorModel', () => {

  test('gets the color model', () => {
    expect(getColorModel(0x12_34_56_AA_01)).toBe(0x1);
    expect(getColorModel(0x12_34_56_AA_0C)).toBe(0xC);
    expect(getColorModel(0x12_34_56_AA_DC)).toBe(0xDC);
  });
});

describe('getColorByte', () => {

  test('gets the color byte', () => {
    const color = 0x12_34_56_AA_01; // RGB

    expect(getColorByte(color, 0)).toBe(0x12);
    expect(getColorByte(color, 1)).toBe(0x34);
    expect(getColorByte(color, 2)).toBe(0x56);
    expect(getColorByte(color, 3)).toBe(0xAA);
  });
});

describe('getColorFloat', () => {

  test('gets the color byte as float', () => {
    const color = 0x12_34_56_AA_01; // RGB

    expect(getColorFloat(color, 0)).toBe(0x12 / 0xFF);
    expect(getColorFloat(color, 1)).toBe(0x34 / 0xFF);
    expect(getColorFloat(color, 2)).toBe(0x56 / 0xFF);
    expect(getColorFloat(color, 3)).toBe(0xAA / 0xFF);
  });
});

describe('setColorByte', () => {

  test('sets the color byte', () => {
    expect(setColorByte(0x12_34_56_78_00, 0, 0xAA)).toBe(0xAA_34_56_78_00);
    expect(setColorByte(0x12_34_56_78_00, 1, 0xAA)).toBe(0x12_AA_56_78_00);
    expect(setColorByte(0x12_34_56_78_00, 2, 0xAA)).toBe(0x12_34_AA_78_00);
    expect(setColorByte(0x12_34_56_78_00, 3, 0xAA)).toBe(0x12_34_56_AA_00);

    expect(setColorByte(0x12_34_56_78_00, 0, 0xA)).toBe(0x0A_34_56_78_00);
    expect(setColorByte(0x12_34_56_78_00, 1, 0xA)).toBe(0x12_0A_56_78_00);
    expect(setColorByte(0x12_34_56_78_00, 2, 0xA)).toBe(0x12_34_0A_78_00);
    expect(setColorByte(0x12_34_56_78_00, 3, 0xA)).toBe(0x12_34_56_0A_00);

    expect(setColorByte(0x12_34_56_78_00, 0, 0xA0)).toBe(0xA0_34_56_78_00);
    expect(setColorByte(0x12_34_56_78_00, 1, 0xA0)).toBe(0x12_A0_56_78_00);
    expect(setColorByte(0x12_34_56_78_00, 2, 0xA0)).toBe(0x12_34_A0_78_00);
    expect(setColorByte(0x12_34_56_78_00, 3, 0xA0)).toBe(0x12_34_56_A0_00);
  });

  test('prevents overflow', () => {
    expect(setColorByte(0x12_34_56_78_00, 0, 0xAA_BB)).toBe(0xFF_34_56_78_00);
    expect(setColorByte(0x12_34_56_78_00, 1, 0xAA_BB)).toBe(0x12_FF_56_78_00);
    expect(setColorByte(0x12_34_56_78_00, 2, 0xAA_BB)).toBe(0x12_34_FF_78_00);
    expect(setColorByte(0x12_34_56_78_00, 3, 0xAA_BB)).toBe(0x12_34_56_FF_00);
  });
});
