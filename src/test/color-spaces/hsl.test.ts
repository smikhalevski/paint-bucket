import {hsl, packHsl, unpackHsl} from '../../main/color-spaces/hsl';
import {ColorSpace} from '../../main/colors/color-types';

describe('hsl', () => {

  test('creates HSL color', () => {
    expect(hsl(25, 30, 70)).toEqual({
      colorSpace: ColorSpace.HSL,
      H: 25,
      S: 30,
      L: 70,
      a: 1,
    });
  });

  test('creates HSL color with alpha', () => {
    expect(hsl(25, 30, 70, .5)).toEqual({
      colorSpace: ColorSpace.HSL,
      H: 25,
      S: 30,
      L: 70,
      a: .5,
    });
  });
});

describe('packHsl', () => {

  test('clamps bytes', () => {
    expect(packHsl(hsl(900, 30, 200, 100))).toBe(0xFF_4D_FF_FF_1);
  });
});

describe('unpackHsl', () => {

  test('symmetrical to packaging', () => {
    const targetColor = hsl(0, 0, 0);
    const unpackedColor = unpackHsl(packHsl(hsl(25, 30, 70, .2)), targetColor);

    expect(unpackedColor).toBe(targetColor);
    expect(unpackedColor).toEqual({
      colorSpace: ColorSpace.HSL,
      H: 25.41176470588235,
      S: 30.19607843137255,
      L: 70.19607843137254,
      a: .2,
    });
  });
});
