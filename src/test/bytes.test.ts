import {ColorModel, fromRawColor, getColorByte, setColorByte} from '../main/bytes';

describe('fromRawColor', () => {

  test('RGB', () => {
    const color = fromRawColor(ColorModel.RGB, 0x123456, 6);

    expect(color).toBe(0x123456FF00 + ColorModel.RGB);

    expect(getColorByte(color, 0)).toBe(0x12);
    expect(getColorByte(color, 1)).toBe(0x34);
    expect(getColorByte(color, 2)).toBe(0x56);
  });

  test('RGB with transparency', () => {
    const color = fromRawColor(ColorModel.RGB, 0x1234, 4);

    expect(color).toBe(0x1122334400 + ColorModel.RGB);

    expect(getColorByte(color, 0)).toBe(0x11);
    expect(getColorByte(color, 1)).toBe(0x22);
    expect(getColorByte(color, 2)).toBe(0x33);
    expect(getColorByte(color, 3)).toBe(0x44);
  });
});

describe('setColorByte', () => {

  test('sets color byte', () => {
    expect(setColorByte(0x1234567800, 2, 0xAA)).toBe(0x1234AA7800)
  });
});
