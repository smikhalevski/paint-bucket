import {createRgb, intToRgb, rgbToInt} from '../main';

describe('rgbToInt', () => {

  test('clamps bytes', () => {
    expect(rgbToInt(createRgb(0xAA / 0xFF, 0x34 / 0xFF, 300 / 0xFF, 0))).toBe(0xAA_34_FF_00);
  });
});

describe('intToRgb', () => {

  test('symmetrical to packaging', () => {
    const rgb1 = createRgb();
    const rgb2 = intToRgb(rgbToInt(createRgb(0.23, 0.52, 0.86, 0.2)), rgb1);

    expect(rgb2).toBe(rgb1);
    expect(rgb2).toEqual({
      R: 0.23137254901960785,
      G: 0.5215686274509804,
      B: 0.8588235294117647,
      a: 0.2,
    });
  });
});
