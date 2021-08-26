import {ColorModel, getColorOctet, makeColor} from '../main/octets';

describe('makeColor', () => {

  test('makes RGB', () => {
    const color = makeColor(ColorModel.RGB, 0x123456, 6);

    expect(color).toBe(0x123456FF00 + ColorModel.RGB);

    expect(getColorOctet(color, 0)).toBe(0x12);
    expect(getColorOctet(color, 1)).toBe(0x34);
    expect(getColorOctet(color, 2)).toBe(0x56);
  });

  test('makes RGBa', () => {
    const color = makeColor(ColorModel.RGB, 0x1234, 4);

    expect(color).toBe(0x1122334400 + ColorModel.RGB);

    expect(getColorOctet(color, 0)).toBe(0x11);
    expect(getColorOctet(color, 1)).toBe(0x22);
    expect(getColorOctet(color, 2)).toBe(0x33);
    expect(getColorOctet(color, 3)).toBe(0x44);
  });
});
